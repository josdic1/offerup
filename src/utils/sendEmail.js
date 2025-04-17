import emailjs from 'emailjs-com';

export default async function sendEmail(payload) {
  const emailData = {
    dealer_name: payload.dealer_name,
    dealer_email: payload.dealer_email,
    selectedBrand: payload.selectedBrand,
    offerType: payload.offerType,
    offerText: payload.offerText,
    timestamp: payload.timestamp
  };

  try {
    await emailjs.send(
      'service_y04y7fh',
      'template_4g4ajbg',
      emailData,
      'Qr8ucWUkLFcYYKujc'
    );
  } catch (error) {
    console.error('❌ EmailJS error:', error);
    throw error;
  }
}
