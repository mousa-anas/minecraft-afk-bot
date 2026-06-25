Minecraft AFK Bot v2.0 - Wall Collision Detection

The Smart Idea: Bot walks forward until hitting wall, then turns around and repeats!

---

How It Works:

1. Walks forward continuously
2. Detects wall when Position doesn't change (Motion = 0)
3. Rotates 180 degrees (viewing direction changes)
4. Walks backward toward the other direction
5. Hits second wall and returns to forward
6. Repeats forever!

---

Features:

- Real physical movement = Idle timeout resets
- No hunger loss = Normal walking doesn't decrease hunger
- Simple and efficient = No need for large spaces
- Safe from bans = Natural movement (not exploit)

---

Installation:

# 1. Install dependencies
npm install

# 2. Create .env file (optional)
# Or use environment variables directly

# 3. Run the bot
npm start
# or
node bot.js

---

Configuration:

Method 1 - Environment Variables:

export SERVER_HOST="your-server.aternos.me"
export SERVER_PORT="25565"
export BOT_USERNAME="AFKBot"
export MC_VERSION="1.20.4"

npm start

Method 2 - Direct Code Edit:

At the beginning of bot.js:

const config = {
  host: 'your-server.aternos.me',
  port: 25565,
  username: 'AFKBot',
  version: '1.20.4',
  offline: true  // Change to false if you have auth
};

---

Deployment on cyclic.sh:

Step 1: Save files to GitHub

your-repo/
├── bot.js
├── package.json
└── .env (if needed)

Step 2: Connect cyclic.sh with your repo

1. Go to cyclic.sh
2. Click "Deploy from Git"
3. Select your repo
4. Click Deploy

Step 3: Add environment variables

In cyclic.sh Dashboard:
- SERVER_HOST = server address
- SERVER_PORT = 25565
- BOT_USERNAME = bot name
- MC_VERSION = Minecraft version

Step 4: Monitor the logs

[SUCCESS] Bot logged in as AFKBot
[INFO] Starting AFK Loop...
[INFO] Resuming walk in forward direction
[WARNING] Stuck! Counter: 1
[ACTION] Turning around! Current direction: forward
[SUCCESS] Turned around! Now facing: backward

---

Changes from Old Version:

Feature          | Old           | New
Movement         | Jump (loses hunger) | Walk (no hunger loss)
Detection        | No            | Detects wall by Position
Rotation         | No            | Rotates 180 degrees automatically
Idle Timeout     | Kicked out    | Stays connected

---

Important Notes:

1. Server must be in Offline Mode:
   - Aternos: Settings → Offline Mode (enable)

2. Space:
   - Place bot between two nearby walls (2-3 blocks)
   - So it hits quickly and turns around

3. Anti-Bot Protection:
   - Some servers have anti-bot protection
   - Whitelist the bot if possible

4. Security:
   - Don't use a real account
   - Use Offline Mode if possible

---

Final Usage:

# Run locally
npm start

# Run on cyclic.sh (automatic)
# Every push → bot runs

# Stop bot
Ctrl + C

---

Debugging:

If bot doesn't work:

// Add more logs:
console.log(`Position: ${bot.entity.position}`);
console.log(`Direction: ${direction}`);
console.log(`Yaw: ${bot.entity.yaw}`);

---

Summary:

Your idea was brilliant!
- Real movement
- No hunger loss
- Simple and effective
- Connection stays 24/7

Now push to GitHub and run bot on cyclic.sh!
on Railway.app - it's secure and works perfectly!
