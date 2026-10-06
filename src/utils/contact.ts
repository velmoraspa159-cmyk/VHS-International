export const OFFICIAL_PHONE = "+91 99127 06021";
export const OFFICIAL_PHONE_RAW = "919912706021";
export const OFFICIAL_EMAIL = "velmoraspa159@gmail.com";

/**
 * Generates WhatsApp redirect URL with customized pre-filled message indicating
 * that the user was redirected from the website.
 */
export const getWhatsAppUrl = (topic: 'general' | 'booking' | 'corporate' | 'partner' = 'general') => {
  let message = "";

  switch (topic) {
    case 'corporate':
      message = "Hi Velmora Home Spa, I am redirected from your website. I would like to inquire about your Corporate Wellness packages and on-site office spa sessions for our company.";
      break;
    case 'booking':
      message = "Hi Velmora Home Spa, I am redirected from your website. I would like to book a home spa appointment at my residence.";
      break;
    case 'partner':
      message = "Hi Velmora Home Spa, I am redirected from your website. I am interested in partnering with you as a visiting home spa specialist.";
      break;
    case 'general':
    default:
      message = "Hi Velmora Home Spa, I am redirected from your website. I would like to know more about your home spa rituals and availability.";
      break;
  }

  return `https://wa.me/${OFFICIAL_PHONE_RAW}?text=${encodeURIComponent(message)}`;
};
