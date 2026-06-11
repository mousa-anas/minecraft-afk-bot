const mineflayer = require('mineflayer');
const http = require('http');

// Configuration from environment variables (with defaults)
const serverIP = process.env.SERVER_IP || 'localhost';
const serverPort = parseInt(process.env.SERVER_PORT) || 25565;
const botUsername = process.env.BOT_USERNAME || 'AFKBot';

// Simple HTTP server to keep the project awake on platforms like Glitch
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK bot is running');
}).listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

function createBot() {
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
    console.log('Bot spawned. Starting anti-AFK movement...');
    startAntiAFK(bot);
  });

  bot.on('end', (reason) => {
    console.log(`Disconnected: ${reason}. Reconnecting in 10 seconds...`);
    setTimeout(createBot, 10000); // Reconnect after 10 seconds
  });

  bot.on('error', (err) => {
    console.log(`Error: ${err.message}`);
  });

  return bot;
}

function randomAction(bot) {
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

function startAntiAFK(bot) {
  setInterval(() => randomAction(bot), 8000);
}

// Start the first bot instance
createBot();
