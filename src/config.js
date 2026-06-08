// ── BARBELL BIOTECH CONFIGURATION ────────────────────────────────────────────
// Edit this file to update keys, addresses, and settings

export const CONFIG = {
  // EmailJS — all emails via Zoho SMTP
  EMAILJS_SERVICE_ID:        'service_3duhdm8',
  EMAILJS_TEMPLATE_ORDER:    'template_68p32ml',    // Order notification to you
  EMAILJS_TEMPLATE_CUSTOMER: 'template_zi1nekd',    // Confirmation to customer
  EMAILJS_PUBLIC_KEY:        'JeZu2-v9rHhgqGZId',

  // Google Apps Script — reviews
  REVIEWS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwhrDh95vM1kpWm83fndmSwO15x-jDjYSdliVjNBXqfngWht_VIRBLVCpbQyiUBHSDU/exec',

  // Google Apps Script — inventory (paste your deployed web app URL here)
  INVENTORY_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxLAt-8Msb8YjbJbGBf8mJT1f-XGqwH9pL4Dx467dmpAdf1g-jqR-ZA1ml0E9gRkR4x/exec',

  // Contact
  CONTACT_EMAIL: 'research@barbellbiotech.com',
};

export const WALLETS = {
  'USDT (ERC-20)': '0x0107935Cca80E523E4Eb943d4a271D2F3e4d451D',
  'Bitcoin (BTC)':  'bc1q2jz2y4krrk2g8p38ede5rs5eqyt4lnlsx8wjf0',
  'Ethereum (ETH)': '0x0107935Cca80E523E4Eb943d4a271D2F3e4d451D',
  'Solana (SOL)':   'AKuAqtFBKqRwe1pgLn4dYUVZJFbW9UbKRAR8vW42N8aa',
  'Bank Transfer (AUD)': 'BSB: 772-772 · Account: 141003210',
};

export const BANK_KEY = 'Bank Transfer (AUD)';
export const BANK_BSB = '772-772';
export const BANK_ACCOUNT = '141003210';
