const mineflayer = require('mineflayer');

// Configuration
const config = {
  host: process.env.SERVER_HOST || 'localhost',
  port: parseInt(process.env.SERVER_PORT || 25565),
  username: process.env.BOT_USERNAME || 'AFKBot',
  version: process.env.MC_VERSION || '1.20.4',
  offline: true // Set to false if your server uses authentication
};

let bot = mineflayer.createBot(config);
let isWalking = false;
let lastPosition = null;
let stuckCounter = 0;
let direction = 'forward'; // 'forward' or 'backward'

bot.on('login', () => {
  console.log(`[SUCCESS] Bot logged in as ${config.username}`);
  startAFKLoop();
});

bot.on('error', (err) => {
  console.error('[ERROR] Connection error:', err);
  setTimeout(() => bot.quit(), 5000);
});

bot.on('kicked', (reason) => {
  console.log('[WARNING] Bot kicked:', reason);
  setTimeout(() => {
    bot = mineflayer.createBot(config);
  }, 5000);
});

function startAFKLoop() {
  console.log('[INFO] Starting AFK Loop...');
  
  // Walk forward/backward continuously
  setInterval(() => {
    walkAndCheckCollision();
  }, 100); // Check position every 100ms

  // Safety check every 10 seconds
  setInterval(() => {
    console.log(`[INFO] Current position: X=${Math.floor(bot.entity.position.x)}, Z=${Math.floor(bot.entity.position.z)}`);
  }, 10000);
}

function walkAndCheckCollision() {
  if (!bot.entity) return;

  // Get current position
  const currentPos = {
    x: bot.entity.position.x,
    y: bot.entity.position.y,
    z: bot.entity.position.z
  };

  // Check if position changed
  if (lastPosition) {
    const distanceMoved = Math.sqrt(
      Math.pow(currentPos.x - lastPosition.x, 2) +
      Math.pow(currentPos.z - lastPosition.z, 2)
    );

    if (distanceMoved < 0.01) {
      // Bot is stuck (hit a wall)
      stuckCounter++;
      console.log(`[WARNING] Stuck! Counter: ${stuckCounter}`);

      if (stuckCounter >= 5) {
        // After 5 ticks of no movement, turn around
        console.log(`[ACTION] Turning around! Current direction: ${direction}`);
        turnAround();
        stuckCounter = 0;
      }
    } else {
      // Bot is moving, reset stuck counter
      stuckCounter = 0;
    }
  }

  // Set last position for next check
  lastPosition = { ...currentPos };

  // Keep moving forward/backward
  if (direction === 'forward') {
    bot.setControlState('forward', true);
    bot.setControlState('back', false);
  } else {
    bot.setControlState('forward', false);
    bot.setControlState('back', true);
  }
}

function turnAround() {
  // Stop moving
  bot.setControlState('forward', false);
  bot.setControlState('back', false);

  // Change direction
  direction = direction === 'forward' ? 'backward' : 'forward';

  // Rotate yaw by 180 degrees
  const currentYaw = bot.entity.yaw;
  const newYaw = currentYaw + Math.PI; // Add 180 degrees (π radians)
  bot.look(newYaw, bot.entity.pitch);

  console.log(`[SUCCESS] Turned around! Now facing: ${direction}`);

  // Resume walking after a short pause
  setTimeout(() => {
    console.log(`[INFO] Resuming walk in ${direction} direction`);
  }, 200);
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[INFO] Shutting down bot...');
  bot.end();
  process.exit();
});
