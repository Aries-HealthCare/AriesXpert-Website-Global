// Website Form Integration with Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ariesxpert-backend.onrender.com';

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  condition: string;
  urgency?: 'low' | 'normal' | 'high' | 'urgent';
}

export async function submitLeadToBackend(data: LeadFormData) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/leads/create-from-website`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          city: data.city,
          area: data.area,
          condition: data.condition,
          urgency: data.urgency || 'normal',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        leadId: result.data?.leadId,
        broadcastId: result.data?.broadcastId,
        message: result.message,
      };
    } else {
      throw new Error(result.message || 'Failed to submit lead');
    }
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
}

export async function sendLeadConfirmationEmail(
  email: string,
  name: string,
  leadId: string
) {
  try {
    const response = await fetch('/api/email/send-lead-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        leadId,
        subject: 'Your Request Received - Aries Healthcare',
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

export async function sendLeadWhatsApp(
  phone: string,
  name: string,
  leadId: string
) {
  try {
    const response = await fetch('/api/whatsapp/send-lead-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        name,
        leadId,
        message: `Hi ${name}! Thanks for reaching out. A healthcare professional will contact you shortly.`,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
  }
}

// Update the booking form to use this
export async function handleBookingFormSubmit(formData: LeadFormData) {
  try {
    // Submit to backend
    const leadResult = await submitLeadToBackend(formData);

    // Send confirmation email
    await sendLeadConfirmationEmail(
      formData.email,
      formData.name,
      leadResult.leadId
    );

    // Send WhatsApp confirmation
    await sendLeadWhatsApp(
      formData.phone,
      formData.name,
      leadResult.leadId
    );

    return {
      success: true,
      message: leadResult.message,
      leadId: leadResult.leadId,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
