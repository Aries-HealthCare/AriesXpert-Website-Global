import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // 1. Check Edge Geo Headers (Vercel, Cloudflare, AWS CloudFront)
    const vercelCity = request.headers.get('x-vercel-ip-city');
    const vercelRegion = request.headers.get('x-vercel-ip-country-region');
    const vercelCountry = request.headers.get('x-vercel-ip-country');
    const cfCity = request.headers.get('cf-ipcity');
    const cfRegion = request.headers.get('cf-region');
    const cfCountry = request.headers.get('cf-ipcountry');

    const edgeCity = vercelCity || cfCity;
    const edgeRegion = vercelRegion || cfRegion;
    const edgeCountry = vercelCountry || cfCountry;

    if (edgeCity) {
      const decodedCity = decodeURIComponent(edgeCity);
      const decodedRegion = edgeRegion ? decodeURIComponent(edgeRegion) : undefined;
      return NextResponse.json({
        city: decodedCity,
        region: decodedRegion,
        country: edgeCountry || 'IN',
        source: 'edge_headers',
      }, {
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
      });
    }

    // 2. Extract Client IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    let clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '';

    // Ignore local development loopbacks when querying external ip service
    const isLocal = !clientIp || clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.');
    const queryUrl = isLocal ? 'https://ipwho.is/' : `https://ipwho.is/${clientIp}`;

    // 3. Resilient IP Geolocation Lookup via ipwho.is with 3s timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(queryUrl, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.success !== false && (data.city || data.region)) {
          return NextResponse.json({
            city: data.city || '',
            region: data.region || '',
            country: data.country || 'India',
            postal: data.postal || '',
            source: 'ipwho',
          }, {
            headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' }
          });
        }
      }
    } catch {
      // Fall through to secondary fallback
    }

    // 4. Secondary fallback: freeipapi.com
    try {
      const controller2 = new AbortController();
      const timeoutId2 = setTimeout(() => controller2.abort(), 2500);

      const res2 = await fetch('https://freeipapi.com/api/json', {
        signal: controller2.signal,
        headers: { 'Accept': 'application/json' },
      });
      clearTimeout(timeoutId2);

      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && data2.cityName) {
          return NextResponse.json({
            city: data2.cityName,
            region: data2.regionName || '',
            country: data2.countryName || 'India',
            postal: data2.zipCode || '',
            source: 'freeipapi',
          });
        }
      }
    } catch {
      // Ignore
    }

    return NextResponse.json({
      city: null,
      region: null,
      country: 'India',
      source: 'fallback_none',
    });
  } catch (error) {
    return NextResponse.json({
      city: null,
      error: 'Location detection encountered an issue',
      source: 'error_fallback',
    }, { status: 200 });
  }
}
