// DOM Elements
const btnMinimize = document.getElementById('btn-minimize');
const btnClose = document.getElementById('btn-close');
const btnConfig = document.getElementById('btn-config');

// Theme buttons
const selectClaude = document.getElementById('select-claude');
const selectGemini = document.getElementById('select-gemini');
const selectCodex = document.getElementById('select-codex');
const selectOpencode = document.getElementById('select-opencode');

// Panels
const panelClaude = document.getElementById('panel-claude');
const panelGemini = document.getElementById('panel-gemini');
const panelCodex = document.getElementById('panel-codex');
const panelOpencode = document.getElementById('panel-opencode');
const panelConfig = document.getElementById('panel-config');

// Config Inputs
const cfgLang = document.getElementById('cfg-lang');
const cfgScanlines = document.getElementById('cfg-scanlines');
const cfgFlicker = document.getElementById('cfg-flicker');
const cfgSound = document.getElementById('cfg-sound');
const cfgOpacity = document.getElementById('cfg-opacity');

// Claude values
const claudeStatus = document.getElementById('claude-status');
const claudePid = document.getElementById('claude-pid');
const claudeTier = document.getElementById('claude-tier');
const claudeInput = document.getElementById('claude-input');
const claudeOutput = document.getElementById('claude-output');
const claudeCwrite = document.getElementById('claude-cwrite');
const claudeCread = document.getElementById('claude-cread');
const claudeCost = document.getElementById('claude-cost');
const claudeSkillsCount = document.getElementById('claude-skills-count');
const claudeLogrosCount = document.getElementById('claude-logros-count');

// Gemini values
const geminiConvs = document.getElementById('gemini-convs');
const geminiSteps = document.getElementById('gemini-steps');
const geminiCost = document.getElementById('gemini-cost');
const geminiLatestLog = document.getElementById('gemini-latest-log');

// Codex values
const codexProcessList = document.getElementById('codex-process-list');
const codexAutocompletes = document.getElementById('codex-autocompletes');
const codexLines = document.getElementById('codex-lines');

// OpenCode values
const opencodeCpuBar = document.getElementById('opencode-cpu-bar');
const opencodeRamBar = document.getElementById('opencode-ram-bar');
const opencodeCpuVal = document.getElementById('opencode-cpu-val');
const opencodeRamVal = document.getElementById('opencode-ram-val');

// Footer elements
const footerTime = document.getElementById('footer-time');

// App state variables
let currentEngine = 'claude';
let initialDataLoaded = false;
let sessionActive = false;
let sessionStartedAt = null;
let sessionTimer = null;
let rawSessionState = 'inactive';
let activeSessionStats = { input: 0, output: 0, cacheWrite: 0, cacheRead: 0, cost: 0 };
let historicalStats = { sessions: 0, input: 0, output: 0, cacheWrite: 0, cacheRead: 0, cost: 0 };
let geminiHistory = { conversations: 0, steps: 0, cost: 0 };
let customSkills = [];

// Autocomplete counters for Codex simulation
let codexCount = 142;
let codexLineCount = 648;

// Localized translation dictionaries
const TRANSLATIONS = {
  es: {
    'lbl-select-engine': 'SELECCIONAR MOTOR:',
    'lbl-status': 'ESTADO DE SESIÓN:',
    'lbl-pid': 'PID ACTIVO:',
    'lbl-plan': 'PLAN / NIVEL:',
    'lbl-cost': 'COSTE ESTIMADO:',
    'lbl-skills': 'SKILLS INSTALADAS',
    'lbl-logros': 'LOGROS DESBLOQUEADOS',
    'lbl-gem-core': 'MOTOR_PRINCIPAL:',
    'lbl-gem-state': 'ESTADO_DEL_WORKSPACE:',
    'lbl-gem-translation-h': 'ÚLTIMO PASO DE TRADUCCIÓN:',
    'lbl-codex-observer': 'OBSERVADOR_IDE:',
    'lbl-codex-workload': 'CARGA IDE (CPU/RAM):',
    'lbl-autocompletes': 'AUTOCOMPLETADOS',
    'lbl-lines': 'LÍNEAS ACEPTADAS',
    'lbl-opencode-state': 'ESTADO API LOCAL:',
    'lbl-opencode-model': 'MODELO CARGADO:',
    'lbl-opencode-load-stats': 'CARGA DE LA TERMINAL:',
    'lbl-opencode-speed': 'VELOCIDAD_TOKENS:',
    'lbl-cfg-header': 'SISTEMA_CONFIG',
    'lbl-cfg-lang': 'IDIOMA:',
    'lbl-cfg-scanlines': 'LÍNEAS DE ESCANEO:',
    'lbl-cfg-flicker': 'PARPADEO DE PANTALLA:',
    'lbl-cfg-sound': 'EFECTOS DE SONIDO:',
    'lbl-cfg-opacity': 'OPACIDAD:',
    'lbl-title': 'RETRO_DASH // v1.02',
    'lbl-hotkey': 'ATAJO: ALT+SHIFT+C',
    'status-inactive': 'INACTIVO',
    'status-active': 'ACTIVO',
    'status-busy': 'OCUPADO',
    'gem-waiting': '> ESPERANDO ACCIÓN API GEMINI...',
    'sys-waiting': '> ESPERANDO EVENTOS DEL SISTEMA...'
  },
  en: {
    'lbl-select-engine': 'SELECT ENGINE:',
    'lbl-status': 'SESSION STATUS:',
    'lbl-pid': 'ACTIVE PID:',
    'lbl-plan': 'PLAN TIER:',
    'lbl-cost': 'ESTIMATED COST:',
    'lbl-skills': 'SKILLS INSTALLED',
    'lbl-logros': 'LOGROS UNLOCKED',
    'lbl-gem-core': 'CORE_ENGINE:',
    'lbl-gem-state': 'WORKSPACE STATE:',
    'lbl-gem-translation-h': 'LATEST_TRANSLATION_STEP:',
    'lbl-codex-observer': 'IDE_OBSERVER:',
    'lbl-codex-workload': 'IDE WORKLOAD (CPU/RAM):',
    'lbl-autocompletes': 'AUTOCOMPLETES',
    'lbl-lines': 'LINES ACCEPTED',
    'lbl-opencode-state': 'LOCAL API STATE:',
    'lbl-opencode-model': 'MODEL LOADED:',
    'lbl-opencode-load-stats': 'TERMINAL LOAD STATS:',
    'lbl-opencode-speed': 'TOKEN_SPEED:',
    'lbl-cfg-header': 'CONFIG_SYSTEM',
    'lbl-cfg-lang': 'LANGUAGE:',
    'lbl-cfg-scanlines': 'SCANLINES:',
    'lbl-cfg-flicker': 'SCREEN FLICKER:',
    'lbl-cfg-sound': 'SOUND FX:',
    'lbl-cfg-opacity': 'OPACITY:',
    'lbl-title': 'RETRO_DASH // v1.02',
    'lbl-hotkey': 'HOTKEY: ALT+SHIFT+C',
    'status-inactive': 'INACTIVE',
    'status-active': 'ACTIVE',
    'status-busy': 'BUSY',
    'gem-waiting': '> WAITING FOR GEMINI API ACTION...',
    'sys-waiting': '> WAITING FOR SYSTEM LOG EVENTS...'
  },
  pt: {
    'lbl-select-engine': 'SELECIONAR MOTOR:',
    'lbl-status': 'ESTADO DA SESSÃO:',
    'lbl-pid': 'PID ATIVO:',
    'lbl-plan': 'NÍVEL DO PLANO:',
    'lbl-cost': 'CUSTO ESTIMADO:',
    'lbl-skills': 'SKILLS INSTALADAS',
    'lbl-logros': 'CONQUISTAS DESBLOQUEADAS',
    'lbl-gem-core': 'MOTOR_PRINCIPAL:',
    'lbl-gem-state': 'ESTADO_DO_WORKSPACE:',
    'lbl-gem-translation-h': 'ÚLTIMO PASSO DE TRADUÇÃO:',
    'lbl-codex-observer': 'OBSERVADOR_IDE:',
    'lbl-codex-workload': 'CARGA IDE (CPU/RAM):',
    'lbl-autocompletes': 'AUTOCOMPLETADOS',
    'lbl-lines': 'LINHAS ACEITAS',
    'lbl-opencode-state': 'ESTADO API LOCAL:',
    'lbl-opencode-model': 'MODELO CARREGADO:',
    'lbl-opencode-load-stats': 'CARGA DO TERMINAL:',
    'lbl-opencode-speed': 'VELOCIDADE_TOKENS:',
    'lbl-cfg-header': 'CONFIG_SISTEMA',
    'lbl-cfg-lang': 'IDIOMA:',
    'lbl-cfg-scanlines': 'LINHAS DE VARREDURA:',
    'lbl-cfg-flicker': 'CINTILAÇÃO DE TELA:',
    'lbl-cfg-sound': 'EFEITOS SONOROS:',
    'lbl-cfg-opacity': 'OPACIDADE:',
    'lbl-title': 'RETRO_DASH // v1.02',
    'lbl-hotkey': 'ATALHO: ALT+SHIFT+C',
    'status-inactive': 'INATIVO',
    'status-active': 'ATIVO',
    'status-busy': 'OCUPADO',
    'gem-waiting': '> AGUARDANDO AÇÃO DA API GEMINI...',
    'sys-waiting': '> AGUARDANDO EVENTOS DO SISTEMA...'
  }
};

// Default Customization Settings
let settings = {
  lang: 'es',
  scanlines: 'high',
  flicker: 'on',
  sound: 'on',
  opacity: 94
};

// Load saved settings
function loadSettings() {
  const saved = localStorage.getItem('retro_widget_settings');
  if (saved) {
    try {
      settings = { ...settings, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error loading settings', e);
    }
  }

  // Update inputs values
  cfgLang.value = settings.lang;
  cfgScanlines.value = settings.scanlines;
  cfgFlicker.value = settings.flicker;
  cfgSound.value = settings.sound;
  cfgOpacity.value = settings.opacity;

  // Apply customization
  applyLanguage(settings.lang);
  applyScanlines(settings.scanlines);
  applyFlicker(settings.flicker);
  applyOpacity(settings.opacity);
}

function saveSettings() {
  localStorage.setItem('retro_widget_settings', JSON.stringify(settings));
}

// Customization setters
function applyLanguage(lang) {
  settings.lang = lang;
  saveSettings();

  const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
  for (const id in dict) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = dict[id];
    }
  }

  // Translate active titlebar
  const titleText = document.querySelector('.titlebar-text');
  if (titleText) titleText.textContent = dict['lbl-title'];

  // Translate active hotkey tip
  const hotkeyText = document.querySelector('.hotkey-tip');
  if (hotkeyText) hotkeyText.textContent = dict['lbl-hotkey'];

  // Translate status text dynamically
  updateStatusDisplay();
}

function applyScanlines(level) {
  settings.scanlines = level;
  saveSettings();

  document.body.classList.remove('scanlines-med', 'scanlines-off');
  if (level === 'med') {
    document.body.classList.add('scanlines-med');
  } else if (level === 'off') {
    document.body.classList.add('scanlines-off');
  }
}

function applyFlicker(state) {
  settings.flicker = state;
  saveSettings();

  const crtScreen = document.querySelector('.crt-screen');
  if (crtScreen) {
    if (state === 'off') {
      crtScreen.classList.add('flicker-off');
    } else {
      crtScreen.classList.remove('flicker-off');
    }
  }
}

function applyOpacity(val) {
  settings.opacity = parseInt(val);
  saveSettings();

  const frame = document.querySelector('.terminal-frame');
  if (frame) {
    frame.style.opacity = settings.opacity / 100;
  }
}

// Settings inputs listeners
cfgLang.addEventListener('change', (e) => applyLanguage(e.target.value));
cfgScanlines.addEventListener('change', (e) => applyScanlines(e.target.value));
cfgFlicker.addEventListener('change', (e) => applyFlicker(e.target.value));
cfgSound.addEventListener('change', (e) => {
  settings.sound = e.target.value;
  saveSettings();
  playBeep(800, 0.08);
});
cfgOpacity.addEventListener('input', (e) => applyOpacity(e.target.value));

// Sound generator (synthesizes retro beeps via Web Audio API)
function playBeep(freq, duration, type = 'sine') {
  if (settings.sound === 'off') return;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = type;
    oscillator.frequency.value = freq;
    
    // Low volume
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context failed
  }
}

// Window actions
btnMinimize.addEventListener('click', () => {
  window.api.minimizeWindow();
});

btnClose.addEventListener('click', () => {
  playBeep(150, 0.2, 'sawtooth');
  setTimeout(() => window.api.closeWindow(), 200);
});

// Settings configuration gear button click listener
btnConfig.addEventListener('click', () => {
  playBeep(700, 0.08, 'triangle');
  
  // Toggle configuration panel active state
  engineButtons.forEach(b => b.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  
  panelConfig.classList.add('active');
});

// Engine selector logic
const engineButtons = [selectClaude, selectGemini, selectCodex, selectOpencode];
const panels = [panelClaude, panelGemini, panelCodex, panelOpencode, panelConfig];

engineButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const engine = btn.getAttribute('data-engine');
    if (engine === currentEngine && !panelConfig.classList.contains('active')) return;

    // Beep sound
    playBeep(600, 0.08, 'square');

    // Switch theme class
    document.body.classList.remove('theme-claude', 'theme-gemini', 'theme-codex', 'theme-opencode');
    document.body.classList.add(`theme-${engine}`);

    // Update active button state
    engineButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update panels
    panels.forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-${engine}`).classList.add('active');

    currentEngine = engine;
  });
});

// Clock update
function updateClock() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  footerTime.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
setInterval(updateClock, 1000);
updateClock();

// Initial load data
window.api.requestInitialData();

window.api.onInitialData((data) => {
  initialDataLoaded = true;

  // Set subscription info
  if (data.credentials) {
    claudeTier.textContent = `${data.credentials.subscriptionType.toUpperCase()}_PLAN // ${data.credentials.rateLimitTier}`;
  }

  // Set skills list
  if (data.skills) {
    customSkills = data.skills;
    claudeSkillsCount.textContent = customSkills.length;
  }

  // Claude Stats
  if (data.claudeStats) {
    historicalStats = data.claudeStats;
    updateClaudeUI();
  }

  // Gemini Stats
  if (data.geminiStats) {
    geminiHistory = data.geminiStats;
    geminiConvs.textContent = geminiHistory.conversations;
    geminiSteps.textContent = geminiHistory.steps;
    geminiCost.textContent = `$${geminiHistory.cost.toFixed(2)}`;
  }

  checkAchievements();
  loadSettings(); // Load configuration after initial data
});

// Claude stats aggregation
function updateClaudeUI() {
  const inTokens = historicalStats.input + activeSessionStats.input;
  const outTokens = historicalStats.output + activeSessionStats.output;
  const writes = historicalStats.cacheWrite + activeSessionStats.cacheWrite;
  const reads = historicalStats.cacheRead + activeSessionStats.cacheRead;
  const cost = historicalStats.cost + activeSessionStats.cost;

  claudeInput.textContent = formatNumber(inTokens);
  claudeOutput.textContent = formatNumber(outTokens);
  claudeCwrite.textContent = formatNumber(writes);
  claudeCread.textContent = formatNumber(reads);
  claudeCost.textContent = `$${cost.toFixed(4)} USD`;
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
}

// Active session status updates
window.api.onActiveSessionStatus((status) => {
  if (status.active) {
    sessionActive = true;
    rawSessionState = status.status; // 'busy' or 'idle'
    sessionStartedAt = status.startedAt;

    // Start elapsed timer
    if (!sessionTimer) {
      sessionTimer = setInterval(updateElapsedTimer, 1000);
    }
  } else {
    sessionActive = false;
    rawSessionState = 'inactive';
    claudePid.textContent = 'N/A';
    if (sessionTimer) {
      clearInterval(sessionTimer);
      sessionTimer = null;
    }
    activeSessionStats = { input: 0, output: 0, cacheWrite: 0, cacheRead: 0, cost: 0 };
    updateClaudeUI();
  }
  updateStatusDisplay();
});

function updateStatusDisplay() {
  const dict = TRANSLATIONS[settings.lang] || TRANSLATIONS.es;
  
  if (sessionActive) {
    const statusTxt = dict[`status-${rawSessionState}`] || rawSessionState.toUpperCase();
    claudeStatus.textContent = statusTxt;
    claudeStatus.className = 'value text-glow italic';
    if (rawSessionState === 'busy') {
      claudeStatus.classList.add('text-warning');
    }
  } else {
    claudeStatus.textContent = dict['status-inactive'];
    claudeStatus.className = 'value text-glow italic';
  }
}

function updateElapsedTimer() {
  if (!sessionStartedAt) return;
  const elapsedMs = Date.now() - sessionStartedAt;
  const totalSecs = Math.floor(elapsedMs / 1000);
  const min = Math.floor(totalSecs / 60);
  const sec = totalSecs % 60;
  
  // Display time elapsed inside Claude status
  const pad = (n) => String(n).padStart(2, '0');
  const elapsedStr = `${pad(min)}:${pad(sec)}`;
  
  if (sessionActive) {
    const dict = TRANSLATIONS[settings.lang] || TRANSLATIONS.es;
    const statusTxt = dict[`status-${rawSessionState}`] || rawSessionState.toUpperCase();
    claudeStatus.textContent = `${statusTxt} (${elapsedStr})`;
  }
}

// Active session token usage updates
window.api.onActiveSessionUsage((usage) => {
  // Beep when counts update
  if (usage.input !== activeSessionStats.input || usage.output !== activeSessionStats.output) {
    playBeep(880, 0.05, 'sine');
  }

  activeSessionStats = usage;
  updateClaudeUI();
  checkAchievements();
});

// Logs stream from Claude session
window.api.onSessionNewEvent((entry) => {
  // Appends prompts dynamically to Gemini rolling logger as mock logs
  if (entry.type === 'user' && entry.message && entry.message.content) {
    const promptText = entry.message.content.substring(0, 45);
    const line = document.createElement('div');
    line.className = 'log-line';
    line.textContent = `> CLAUDE: "${promptText}..."`;
    geminiLatestLog.appendChild(line);
    geminiLatestLog.scrollTop = geminiLatestLog.scrollHeight;
  }
});

// Process stats list
window.api.onSystemProcesses((procs) => {
  if (currentEngine === 'codex') {
    codexProcessList.innerHTML = '';
    procs.forEach(p => {
      const row = document.createElement('div');
      row.className = 'sys-row';
      row.innerHTML = `<span class="proc-name">${p.name.toLowerCase()}.exe</span><span class="proc-stat">${p.cpu}% CPU // ${p.ram} MB</span>`;
      codexProcessList.appendChild(row);

      // Check for High CPU achievement condition
      if (p.cpu > 45) {
        ACHIEVEMENTS.find(a => a.id === 'system_overload').check = () => true;
      }
    });

    // Simulate Autocompletes ticks when IDE is running
    if (procs.length > 0 && Math.random() > 0.7) {
      codexCount += Math.floor(Math.random() * 2) + 1;
      codexLineCount += Math.floor(Math.random() * 5) + 2;
      codexAutocompletes.textContent = codexCount;
      codexLines.textContent = codexLineCount;
      playBeep(1200, 0.03, 'triangle');
    }
  }

  if (currentEngine === 'opencode') {
    // Set OpenCode CPU / RAM progress bars based on node/IDE loads
    let cpuLoad = 10;
    let ramLoad = 35;
    
    const nodeProc = procs.find(p => p.name.toLowerCase().includes('node'));
    if (nodeProc) {
      cpuLoad = Math.min(95, Math.max(10, Math.floor(nodeProc.cpu * 5)));
      ramLoad = Math.min(90, Math.max(30, Math.floor(nodeProc.ram / 10)));
    } else {
      cpuLoad = Math.floor(Math.random() * 15) + 10;
    }

    opencodeCpuBar.style.width = `${cpuLoad}%`;
    opencodeCpuVal.textContent = `${cpuLoad}%`;
    opencodeRamBar.style.width = `${ramLoad}%`;
    opencodeRamVal.textContent = `${ramLoad}%`;
  }
});

// Achievements checks and count updates
const ACHIEVEMENTS = [
  { id: 'first_blood', name: 'FIRST_BLOOD', desc: 'Finished at least 1 session', check: () => historicalStats.sessions > 0 },
  { id: 'heavy_loader', name: 'HEAVY_LOADER', desc: 'Session input > 10,000 tokens', check: () => (activeSessionStats.input + historicalStats.input) > 10000 },
  { id: 'cache_whisperer', name: 'CACHE_WHISPERER', desc: 'Cache read ratio > 40%', check: () => {
      const totalIn = activeSessionStats.input + historicalStats.input;
      const totalRead = activeSessionStats.cacheRead + historicalStats.cacheRead;
      return totalIn > 0 && (totalRead / totalIn) > 0.4;
    } 
  },
  { id: 'gemini_cadet', name: 'GEMINI_CADET', desc: 'First Antigravity step tracked', check: () => geminiHistory.steps > 0 },
  { id: 'expert_coder', name: 'EXPERT_CODER', desc: 'At least 1 custom skill installed', check: () => customSkills.length > 0 },
  { id: 'power_user', name: 'POWER_USER', desc: 'Total cost exceeds $5.00', check: () => (activeSessionStats.cost + historicalStats.cost + geminiHistory.cost) > 5.00 },
  { id: 'night_owl', name: 'NIGHT_OWL', desc: 'Coding past midnight', check: () => {
      const hour = new Date().getHours();
      return (hour >= 0 && hour < 5);
    } 
  },
  { id: 'system_overload', name: 'SYSTEM_OVERLOAD', desc: 'High editor CPU activity', check: () => false }
];

function checkAchievements() {
  let unlockedCount = 0;
  ACHIEVEMENTS.forEach(ach => {
    if (ach.check()) {
      unlockedCount++;
    }
  });

  claudeLogrosCount.textContent = `${unlockedCount}/${ACHIEVEMENTS.length}`;

  // Logros box color changes depending on count
  if (unlockedCount >= 6) {
    claudeLogrosCount.className = 'f-val text-glow';
  } else if (unlockedCount >= 3) {
    claudeLogrosCount.className = 'f-val text-cyan';
  }
}
