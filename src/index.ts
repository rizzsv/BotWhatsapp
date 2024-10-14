import { Client, LocalAuth } from 'whatsapp-web.js';
const qrcode = require('qrcode-terminal');

// Inisiasi client WhatsApp dengan local auth
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false, // Menjalankan browser secara visible untuk debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});



// Generate QR code untuk login WhatsApp Web
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Scan QR code above to login to WhatsApp');
});

// Ketika sudah login
client.on('ready', () => {
  console.log('Client is ready!');
});

// Fungsi untuk mengirim pesan
const sendMessage = async (number: string, message: string) => {
  try {
    const formattedNumber = number.replace(/^0/, '62');
    const chatId = `${formattedNumber}@c.us`;
    await client.sendMessage(chatId, message);
    console.log(`Message sent to ${number}`);
  } catch (err) {
    console.error(`Failed to send message to ${number}: ${err}`);
    // Retry mechanism
    setTimeout(() => sendMessage(number, message), 5000); // Coba kirim ulang setelah 5 detik
  }
};

  

// Kirim pesan saat bot siap
client.on('ready', () => {
  const numbers = ['6285855237611', '6285234494610'];
  numbers.forEach(number => {
    sendMessage(number, '');
  });
});

// Start client
client.initialize();
