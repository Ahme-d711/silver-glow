import axios from 'axios';

const WASEL_API_URL = 'https://app.wasel-it.com/api/send-message';
/**
 * Send a WhatsApp message using Wasel-IT API
 * @param phone - Recipient phone number with country code
 * @param message - The message content
 */
export const sendWhatsAppMessage = async (phone: string, message: string) => {
  const API_TOKEN = process.env.WASEL_API_TOKEN;
  const INSTANCE_ID = process.env.WASEL_INSTANCE_ID;

  if (!API_TOKEN || !INSTANCE_ID) {
    console.error('WhatsApp API credentials missing');
    return null;
  }

  // Ensure phone number is in correct format (digits only)
  const formattedPhone = phone.replace(/\D/g, '');

  try {
    const response = await axios.get(WASEL_API_URL, {
      params: {
        instance_id: INSTANCE_ID,
        access_token: API_TOKEN,
        type: 'text',
        number: formattedPhone,
        message: message,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return null;
  }
};

/**
 * Send verification code via WhatsApp
 * @param phone - Recipient phone number
 * @param code - 6-digit verification code
 */
export const sendVerificationWhatsApp = async (phone: string, code: string) => {
  const message = `كود التفعيل الخاص بك في Silver Glow هو: ${code}\n\nيرجى عدم مشاركة هذا الكود مع أي شخص.`;
  return await sendWhatsAppMessage(phone, message);
};
