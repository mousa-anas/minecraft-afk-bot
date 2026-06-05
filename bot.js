const mineflayer = require('mineflayer');

// Read settings from environment variables (with defaults)
const serverIP = process.env.SERVER_IP || 'servivelcraft.aternos.me';
const serverPort = parseInt(process.env.SERVER_PORT) || 42978;
const botUsername = process.env.BOT_USERNAME || 'AFKBot';

// Create bot in offline mode (cracked servers)
const bot = mineflayer.createBot({
  host: serverIP,
  port: serverPort,
  username: botUsername,
  auth: 'offline',
});

bot.on('login', () => {
  console.log(`Logged in as ${bot.username}`);
});

bot.on('spawn', () => {
  console.log('Bot spawned in the world. Starting AFK movement...');
  startAntiAFK();
});

bot.on('end', (reason) => {
  console.log(`Disconnected: ${reason}`);
  process.exit(0);
});

bot.on('error', (err) => {
  console.log(`Error: ${err.message}`);
});

function randomAction() {
  const actions = ['jump', 'look'];
  const choice = actions[Math.floor(Math.random() * actions.length)];

  if (choice === 'jump') {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
    console.log('Jumped');
  } else if (choice === 'look') {
    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * Math.PI;
    bot.look(yaw, pitch, true);
    console.log('Looked around randomly');
  }
}

function startAntiAFK() {
  setInterval(randomAction, 8000);
}