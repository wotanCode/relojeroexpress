export const COMPANY_INFO = {
  NAME: 'Relojero Express',
  WEBSITE_AUTHOR: 'Pedro Yanez - https://github.com/wotanCode'
} as const;

export const CONTACT_INFO = {
  PHONE: {
    NUMBER: '+5491127827974',
    DISPLAY: '+54 9 11 2782-7974',
    WHATSAPP_URL: 'https://wa.me/+5491127827974'
  },
  SOCIAL_MEDIA: {
    INSTAGRAM: {
      USERNAME: 'relojeroexpress_ba',
      URL: 'https://instagram.com/relojeroexpress_ba',
      NUMBER_OF_VIDEOS: 3
    },
    TIKTOK: {
      USERNAME: 'relojeroexpressba',
      URL: 'https://tiktok.com/@relojeroexpressba',
      NUMBER_OF_VIDEOS: 3
    }
  },
  ADDRESS: {
    GOOGLE_MAPS_EMBED: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.5676874862227!2d-58.46080154993653!3d-34.56098554647095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5001b9d26c9%3A0xf0b11ea6563753b2!2sRelojero%20Express!5e0!3m2!1ses!2sar!4v1710621120000!5m2!1ses!2sar'
  }
} as const;

export const PLACEHOLDERS = {
  LATEST_INSTAGRAM: '%{{latest_instagram}}%',
  LATEST_TIKTOK: '%{{latest_tiktok}}%'
} as const;

export const BRAND_COLORS = {
  PRIMARY: '#0197d5',
  DARK: '#1e1c1d'
} as const;
