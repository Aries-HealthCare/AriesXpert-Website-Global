import { NextRequest, NextResponse } from 'next/server';

const MSG91_AUTH_KEY = process.env.MSG91AUTHKEY || process.env.MSG91_AUTH_KEY || '439578AlXaXZMz67a9d754P1';
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ariesxpert.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { mobileNo, otp, cc = '91' } = body;

    const cleanMobile = mobileNo ? String(mobileNo).replace(/\D/g, '') : '';
    const last10Digits = cleanMobile.slice(-10);
    const cleanCc = cc ? String(cc).replace(/\D/g, '') : '91';
    const fullMobile = `${cleanCc}${last10Digits}`;

    if (!last10Digits || !otp) {
      return NextResponse.json(
        { success: false, message: 'Please provide both mobile number and verification code.' },
        { status: 400 }
      );
    }

    // 1. Verify with central backend database
    let backendData: any = null;
    try {
      const backendRes = await fetch(`${BACKEND_API_URL}/api/app/expert/verifyOTPofUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNo: last10Digits, otp, cc: cleanCc }),
      });
      if (backendRes.ok) {
        backendData = await backendRes.json().catch(() => null);
      }
    } catch (bErr) {
      console.warn('[Backend Verify] API error:', bErr);
    }

    // If backend returns verified expert and token, forward it immediately
    if (backendData && backendData.success !== false && (backendData.token || backendData.accessToken || backendData.result)) {
      return NextResponse.json(backendData);
    }

    // 2. Direct verification with MSG91 Gateway
    const msg91VerifyUrl = `https://api.msg91.com/api/v5/otp/verify?authkey=${MSG91_AUTH_KEY}&mobile=${fullMobile}&otp=${otp}`;
    const msg91Res = await fetch(msg91VerifyUrl, { method: 'GET' });
    const msg91Data = await msg91Res.json().catch(() => ({}));

    const isVerified =
      msg91Data?.message === 'OTP verified success' ||
      msg91Data?.type === 'success';

    if (isVerified) {
      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully',
        token: backendData?.token || backendData?.accessToken || 'token_' + Date.now(),
        expert: backendData?.expert || backendData?.result || {
          phone: last10Digits,
          onboardingStatus: 'pending',
          onboardingStep: 0,
        },
        result: backendData?.result || backendData?.expert,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: msg91Data?.message || backendData?.message || 'Invalid verification code. Please check your SMS and try again.',
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('[/api/app/expert/verifyOTPofUser] Error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to verify OTP.' },
      { status: 500 }
    );
  }
}
