const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

let mainWindow = null;
let activeSessionWatcher = null;
let activeSessionFilePath = null;
let activeSessionByteOffset = 0;

// User paths
const userHome = process.env.USERPROFILE || process.env.HOME || 'C:\\Users\\Paulo';
const claudeDir = path.join(userHome, '.claude');
const geminiDir = path.join(userHome, '.gemini', 'antigravity');

// Pricing tables
const PRICING = {
  claude: {
    'claude-sonnet-4-6': { input: 3.0, output: 15.0, cacheWrite: 3.75, cacheRead: 0.30 }, // Sonnet 3.5
    'claude-3-5-sonnet-20241022': { input: 3.0, output: 15.0, cacheWrite: 3.75, cacheRead: 0.30 },
    'claude-3-5-haiku-20241022': { input: 0.8, output: 4.0, cacheWrite: 1.00, cacheRead: 0.08 },
    'claude-opus-4-8': { input: 15.0, output: 75.0, cacheWrite: 18.75, cacheRead: 1.50 },
    'default': { input: 3.0, output: 15.0, cacheWrite: 3.75, cacheRead: 0.30 }
  },
  antigravity: {
    // Gemini 1.5 Pro / Gemini 3.5 Pro estimates
    'gemini': { input: 1.25, output: 5.00, cacheWrite: 0, cacheRead: 0 },
    'default': { input: 1.25, output: 5.00 }
  }
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 340,
    height: 480,
    minWidth: 300,
    minHeight: 420,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    show: false,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');

  // Center window on screen initially, then position floating
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Position near the top right of the screen
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width } = primaryDisplay.workAreaSize;
    mainWindow.setPosition(width - 360, 80);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    cleanupWatchers();
  });
}

function cleanupWatchers() {
  if (activeSessionWatcher) {
    activeSessionWatcher.close();
    activeSessionWatcher = null;
  }
  activeSessionFilePath = null;
  activeSessionByteOffset = 0;
}

// App Ready
app.whenReady().then(() => {
  createWindow();

  // Register Global Shortcut with fallback
  const KEYBINDINGS = ['Alt+Shift+C', 'Ctrl+Shift+C', 'Super+Shift+C'];
  let shortcutRegistered = false;
  for (const kb of KEYBINDINGS) {
    if (globalShortcut.register(kb, () => {
      if (!mainWindow) return;
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    })) {
      shortcutRegistered = true;
      if (mainWindow) {
        mainWindow.webContents.send('shortcut-status', { registered: true, key: kb });
      }
      break;
    }
  }

  if (!shortcutRegistered && mainWindow) {
    mainWindow.webContents.send('shortcut-status', { registered: false, key: null });
  }

  // Periodic watcher for active sessions and system processes
  setInterval(scanActiveSessions, 2000);
  setInterval(scanSystemProcesses, 3000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// App Quit
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// IPC communication
ipcMain.on('window-control', (event, action) => {
  if (!mainWindow) return;
  if (action === 'close') {
    mainWindow.close();
  } else if (action === 'minimize') {
    mainWindow.minimize();
  }
});

ipcMain.on('request-initial-data', (event) => {
  const credentials = readCredentials();
  const skills = readSkills();
  const claudeStats = calculateClaudeHistoricalStats();
  const geminiStats = calculateAntigravityStats();

  event.reply('initial-data', {
    credentials,
    skills,
    claudeStats,
    geminiStats
  });
});

// Read Claude credentials
function readCredentials() {
  try {
    const credPath = path.join(claudeDir, '.credentials.json');
    if (fs.existsSync(credPath)) {
      const data = fs.readFileSync(credPath, 'utf8');
      const json = JSON.parse(data);
      return {
        subscriptionType: json.claudeAiOauth?.subscriptionType || 'N/A',
        rateLimitTier: json.claudeAiOauth?.rateLimitTier || 'N/A'
      };
    }
  } catch (err) {
    console.error('Error reading credentials:', err);
  }
  return { subscriptionType: 'N/A', rateLimitTier: 'N/A' };
}

// Read custom skills
function readSkills() {
  try {
    const skillsPath = path.join(claudeDir, 'skills');
    if (fs.existsSync(skillsPath)) {
      const items = fs.readdirSync(skillsPath, { withFileTypes: true });
      return items.map(item => item.name);
    }
  } catch (err) {
    console.error('Error reading skills:', err);
  }
  return [];
}

// Calculate Claude Code tokens/cost across all project JSONL sessions
function calculateClaudeHistoricalStats() {
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalCacheWrite = 0;
  let totalCacheRead = 0;
  let totalCost = 0.0;
  let totalSessions = 0;

  try {
    const projectsPath = path.join(claudeDir, 'projects');
    if (fs.existsSync(projectsPath)) {
      const projects = fs.readdirSync(projectsPath);
      for (const proj of projects) {
        const projDir = path.join(projectsPath, proj);
        if (fs.statSync(projDir).isDirectory()) {
          const files = fs.readdirSync(projDir);
          for (const file of files) {
            if (file.endsWith('.jsonl')) {
              totalSessions++;
              const filePath = path.join(projDir, file);
              const stats = parseJsonlTokens(filePath);
              totalInputTokens += stats.input;
              totalOutputTokens += stats.output;
              totalCacheWrite += stats.cacheWrite;
              totalCacheRead += stats.cacheRead;
              totalCost += stats.cost;
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('Error calculating historical stats:', err);
  }

  return {
    sessions: totalSessions,
    input: totalInputTokens,
    output: totalOutputTokens,
    cacheWrite: totalCacheWrite,
    cacheRead: totalCacheRead,
    cost: totalCost
  };
}

// Helper to parse tokens and cost from JSONL file
function parseJsonlTokens(filePath) {
  let input = 0;
  let output = 0;
  let cacheWrite = 0;
  let cacheRead = 0;
  let cost = 0.0;

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const entry = JSON.parse(line);
        if (entry.type === 'assistant' && entry.message && entry.message.usage) {
          const u = entry.message.usage;
          const modelName = entry.message.model || 'default';
          const rates = PRICING.claude[modelName] || PRICING.claude.default;

          const inTokens = u.input_tokens || 0;
          const outTokens = u.output_tokens || 0;
          const writeTokens = u.cache_creation_input_tokens || 0;
          const readTokens = u.cache_read_input_tokens || 0;

          input += inTokens;
          output += outTokens;
          cacheWrite += writeTokens;
          cacheRead += readTokens;

          // Price calculations (per Million)
          const inCost = (inTokens / 1000000) * rates.input;
          const outCost = (outTokens / 1000000) * rates.output;
          const writeCost = (writeTokens / 1000000) * rates.cacheWrite;
          const readCost = (readTokens / 1000000) * rates.cacheRead;

          cost += inCost + outCost + writeCost + readCost;
        }
      } catch (e) {
        // Ignore JSON parse error on incomplete lines
      }
    }
  } catch (err) {
    console.error('Error reading jsonl:', filePath, err);
  }

  return { input, output, cacheWrite, cacheRead, cost };
}

// Scan and calculate Antigravity sessions stats
function calculateAntigravityStats() {
  let totalSteps = 0;
  let totalCost = 0.0;
  let totalConversations = 0;

  try {
    const brainPath = path.join(geminiDir, 'brain');
    if (fs.existsSync(brainPath)) {
      const convs = fs.readdirSync(brainPath);
      for (const convId of convs) {
        const logsDir = path.join(brainPath, convId, '.system_generated', 'logs');
        const transcriptPath = path.join(logsDir, 'transcript.jsonl');
        if (fs.existsSync(transcriptPath)) {
          totalConversations++;
          const data = fs.readFileSync(transcriptPath, 'utf8');
          const lines = data.split('\n');
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const step = JSON.parse(line);
              totalSteps++;
              // Estimate Gemini prompt cost (simple step based metric or if token count available)
              // Since token counts aren't always explicitly written in our transcript structure,
              // we can estimate average tokens per turn: ~3000 input, ~1000 output.
              if (step.source === 'MODEL') {
                const rates = PRICING.antigravity.gemini;
                const inCost = (3000 / 1000000) * rates.input;
                const outCost = (1000 / 1000000) * rates.output;
                totalCost += inCost + outCost;
              }
            } catch (e) { }
          }
        }
      }
    }
  } catch (err) {
    // Fail silently on permissions/missing folders during historical count
  }

  return {
    conversations: totalConversations,
    steps: totalSteps,
    cost: totalCost
  };
}

// Watch active session logs
function scanActiveSessions() {
  try {
    const sessionsPath = path.join(claudeDir, 'sessions');
    if (!fs.existsSync(sessionsPath)) return;

    const files = fs.readdirSync(sessionsPath);
    const sessionFiles = files.filter(f => f.endsWith('.json'));

    if (sessionFiles.length === 0) {
      if (mainWindow) {
        mainWindow.webContents.send('active-session-status', { active: false });
      }
      cleanupWatchers();
      return;
    }

    // Read the first active session JSON file
    const sessionFile = sessionFiles[0];
    const data = fs.readFileSync(path.join(sessionsPath, sessionFile), 'utf8');
    const sessionInfo = JSON.parse(data);

    if (mainWindow) {
      mainWindow.webContents.send('active-session-status', {
        active: true,
        pid: sessionInfo.pid,
        sessionId: sessionInfo.sessionId,
        cwd: sessionInfo.cwd,
        startedAt: sessionInfo.startedAt,
        status: sessionInfo.status,
        updatedAt: sessionInfo.updatedAt
      });
    }

    // Set up file watcher for the active session's JSONL log file
    const targetSessionId = sessionInfo.sessionId;
    const projectsPath = path.join(claudeDir, 'projects');
    if (!fs.existsSync(projectsPath)) return;

    // Search for <sessionId>.jsonl in subfolders of projects
    let foundFilePath = null;
    const projDirs = fs.readdirSync(projectsPath);
    for (const p of projDirs) {
      const testPath = path.join(projectsPath, p, `${targetSessionId}.jsonl`);
      if (fs.existsSync(testPath)) {
        foundFilePath = testPath;
        break;
      }
    }

    if (foundFilePath && foundFilePath !== activeSessionFilePath) {
      cleanupWatchers();
      activeSessionFilePath = foundFilePath;
      activeSessionByteOffset = fs.statSync(foundFilePath).size;

      // Send initial content
      const stats = parseJsonlTokens(foundFilePath);
      if (mainWindow) {
        mainWindow.webContents.send('active-session-usage', stats);
      }

      // Watch file changes
      activeSessionWatcher = fs.watch(foundFilePath, (eventType) => {
        if (eventType === 'change') {
          processActiveSessionChanges();
        }
      });
    }
  } catch (err) {
    console.error('Error scanning active sessions:', err);
  }
}

// Process new lines appended to the active session file
function processActiveSessionChanges() {
  if (!activeSessionFilePath) return;
  try {
    const stats = fs.statSync(activeSessionFilePath);
    const size = stats.size;
    if (size <= activeSessionByteOffset) {
      if (size < activeSessionByteOffset) {
        activeSessionByteOffset = 0; // File truncated
      }
      return;
    }

    const stream = fs.createReadStream(activeSessionFilePath, {
      start: activeSessionByteOffset,
      end: size - 1,
      encoding: 'utf8'
    });

    let buffer = '';
    stream.on('data', (chunk) => {
      buffer += chunk;
    });

    stream.on('end', () => {
      activeSessionByteOffset = size;
      const lines = buffer.split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const entry = JSON.parse(line);
          if (mainWindow) {
            mainWindow.webContents.send('session-new-event', entry);
          }
        } catch (e) {}
      }

      const currentStats = parseJsonlTokens(activeSessionFilePath);
      if (mainWindow) {
        mainWindow.webContents.send('active-session-usage', currentStats);
      }
    });
  } catch (err) {
    console.error('Error processing session changes:', err);
  }
}

// Check active editor CPU usage and background processes
function scanSystemProcesses() {
  if (!mainWindow) return;

  // Run a quick powershell query to see active coding workloads
  const psCommand = `powershell -Command "Get-Process | Where-Object { $_.ProcessName -match 'code|cursor|node|powershell|cmd' } | Select-Object -Property ProcessName, CPU, WorkingSet -First 6 | ConvertTo-Json"`;
  
  exec(psCommand, (err, stdout, stderr) => {
    if (err || !stdout) return;
    try {
      const procs = JSON.parse(stdout);
      // Clean and format processes to send to renderer
      const formatted = (Array.isArray(procs) ? procs : [procs]).filter(p => p).map(p => {
        return {
          name: p.ProcessName,
          cpu: p.CPU ? Math.round(p.CPU * 10) / 10 : 0.0,
          ram: p.WorkingSet ? Math.round(p.WorkingSet / 1024 / 1024) : 0
        };
      });

      mainWindow.webContents.send('system-processes', formatted);
    } catch (e) {
      // JSON parsing error or empty response
    }
  });
}
