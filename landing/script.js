document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // LANGUAGE SWITCHER (i18n)
  // ============================================
  const I18N = {
    es: {
      'logo': 'RETRO_DASH_',
      'nav-features': '// funciones',
      'nav-about': '// qué_es',
      'nav-install': '// instalar',
      'donate': '[ DONAR ]',
      'hero-title-1': 'TU USO DE',
      'hero-title-2': 'CLAUDE CODE,',
      'hero-title-3': 'EN RETRO_DASH.',
      'hero-desc': 'Un widget de escritorio que lee tus archivos locales en tiempo real: tokens, coste, límites del plan, skills y logros. Sin APIs, sin nube, sin suscripción.',
      'cmd-text': 'descargar',
      'cmd-os': '[ WINDOWS — 103 MB ]',
      'cmd-meta': 'Portable. Sin instalación. Win 10/11. Listo en < 5 min.',
      'cmd-foot': 'Linux y macOS compilan desde el repo. Una sola línea.',
      'stat-1': 'Histórico de actividad',
      'stat-2': 'Memoria en reposo',
      'stat-3': 'Local · Open Source',
      'sec1-num': '— qué_es',
      'sec1-title': 'Claude Code no te dice<br>cuánto consumes.<br><span class="hl">RETRO_DASH sí.</span>',
      'sec1-lead': 'Trabajas en la terminal y los tokens vuelan a ciegas. RETRO_DASH lee los archivos de sesión locales <code>(~/.claude/projects)</code> y sincroniza el uso real de tu plan para enseñarte, sin abrir nada, lo que de verdad estás gastando.',
      'sec1-c1-h': 'Datos reales, no estimaciones',
      'sec1-c1-p': 'Lee cada sesión incremental: input, output y cache tokens, coste en euros por modelo, sesiones del día. Lo que ves es lo que hay.',
      'sec1-c2-h': 'Tus límites del plan, sincronizados',
      'sec1-c2-p': 'Ventana de 5 horas y límites semanales (todos los modelos: Sonnet, Opus, Haiku) sincronizados con tu cuenta. Coincide con el panel al digitar.',
      'sec1-c3-h': 'Flota sobre todo lo demás',
      'sec1-c3-p': 'Atajo global <strong>Alt+Shift+C</strong> para abrir/cerrar. Diseño CRT, ventana sin marco, siempre encima. Arrastrable, redimensionable, opaca o fantasma.',
      'sec2-num': '— cinco_paneles',
      'sec2-title': 'Toda tu actividad,<br>en una sola pantalla<br>de <span class="hl">fósforo</span>.',
      'sec2-c1-h': 'Uso de sesión',
      'sec2-c1-p': 'Tokens de la sesión activa, coste hoy, cache hit, modelos y proyectos activos. Burn rate y tiempo restante al instante.',
      'sec2-c2-h': 'Inventario',
      'sec2-c2-p': 'Lista de skills instaladas, su tipo y estado. Como el inventario de un JRPG, pero con hooks de Claude Code dentro.',
      'sec2-c3-h': 'Proyectos / cuota',
      'sec2-c3-p': 'IDE observer: CPU/RAM de <code>code.exe</code> y <code>cursor.exe</code>, autocompletados y líneas aceptadas por sesión.',
      'sec2-c4-h': 'Plan + horas',
      'sec2-c4-p': 'API local en :11434, modelo cargado (Qwen 2.5 Coder 7B), velocidad en tok/s y carga CPU/RAM del LLM.',
      'sec2-c5-h': 'El resto del universo',
      'sec2-c5-p': 'Panel <strong>Antigravity</strong> con sesiones de Gemini, contador de pasos y log de la última traducción. <strong>Sistema de logros</strong> tipo arcade con rareza, y <strong>panel de configuración</strong> con idioma, scanlines, opacidad y efectos.',
      'sec3-num': '— cero_fricción',
      'sec3-title': 'Tres pasos.<br>Cero <span class="hl">configuración</span>.',
      'sec3-s1-h': 'Descárgalo',
      'sec3-s1-p': 'ZIP portable para Windows. Binarios nativos para macOS y Linux sin entorno local de Claude Code.',
      'sec3-s2-h': 'Pulsa el atajo',
      'sec3-s2-p': '<strong>Alt+Shift+C</strong> para abrir/cerrar el monitor flotante. Sin ventanas extras, sin clicks.',
      'sec3-s3-h': 'A vivir',
      'sec3-s3-p': 'Lo dejas siempre encima o lo escondes. La ventana vive, los datos cambian, la forma se queda.',
      'sec3-foot': '<em>Requiere tener Claude Code instalado y una sesión iniciada. No abre nada: solo lee los archivos locales en <code>~/.claude/projects</code> bajo tu perfil. Solo corre en tu máquina.</em>',
      'sec4-tag': '— apoyar',
      'sec4-d-h': 'Invítame a un <span class="hl">café</span> ☕',
      'sec4-d-p': 'RETRO_DASH es MIT open source y siempre lo será. Si te ahorra tiempo, considera apoyar al mantenimiento.',
      'dm-1': 'Mensual o one-time. Integrado con el repo.',
      'dm-2': 'Sin cuenta, sin fees. Un café = 3€.',
      'dm-3': 'Tarjeta o cuenta. Internacional.',
      'dm-4': 'ETH · SOL · BTC → wallet pendiente',
      'dm-copy': '[ COPIAR ]',
      'sec4-d-foot': '<em>El soporte llega a código, a documentación y a la próxima release (logros, métricas, plugins). Nada se va a publicidad ni a telemetría.</em>',
      'sec5-tag': '— early_access',
      'sec5-h': 'Entra en la <span class="hl">lista</span>.',
      'sec5-p': 'Recibe un email cuando salga la siguiente release. Sin spam. Sin venderte nada. Una al mes, máximo.',
      'sec5-lbl': 'E-MAIL',
      'sec5-r1': 'Releases + noticias',
      'sec5-r2': 'Solo releases',
      'sec5-btn': '[ DESBLOQUEAR ACCESO ]',
      'sec5-foot': 'No mandamos spam. Un email de aviso. Discreto.',
      'sec5-meta': 'suscriptores fundadores',
      'ft-tag': 'PROYECTO INDEPENDIENTE · NO AFILIADO A ANTHROPIC, GOOGLE U OPENAI',
      'ft-thanks': 'Hecho para gente que vive dentro de la terminal.'
    },
    en: {
      'logo': 'RETRO_DASH_',
      'nav-features': '// features',
      'nav-about': '// about',
      'nav-install': '// install',
      'donate': '[ DONATE ]',
      'hero-title-1': 'YOUR USAGE OF',
      'hero-title-2': 'CLAUDE CODE,',
      'hero-title-3': 'ON RETRO_DASH.',
      'hero-desc': 'A desktop widget that reads your local files in real time: tokens, cost, plan limits, skills and achievements. No APIs, no cloud, no subscription.',
      'cmd-text': 'download',
      'cmd-os': '[ WINDOWS — 103 MB ]',
      'cmd-meta': 'Portable. No install. Win 10/11. Ready in < 5 min.',
      'cmd-foot': 'Linux & macOS build from the repo. One line.',
      'stat-1': 'Activity history',
      'stat-2': 'Idle memory',
      'stat-3': 'Local · Open Source',
      'sec1-num': '— what_is',
      'sec1-title': 'Claude Code won\'t tell you<br>how much you burn.<br><span class="hl">RETRO_DASH will.</span>',
      'sec1-lead': 'You work in the terminal and tokens fly blind. RETRO_DASH reads the local session files <code>(~/.claude/projects)</code> and syncs your real plan usage — without opening anything — so you see what you\'re actually spending.',
      'sec1-c1-h': 'Real data, not estimates',
      'sec1-c1-p': 'Reads each session incrementally: input, output, cache tokens, per-model cost in euros, today\'s sessions. What you see is what is.',
      'sec1-c2-h': 'Your plan limits, synced',
      'sec1-c2-p': '5-hour window and weekly limits (all models: Sonnet, Opus, Haiku) synced with your account. Matches the panel on input.',
      'sec1-c3-h': 'Floats above everything else',
      'sec1-c3-p': 'Global shortcut <strong>Alt+Shift+C</strong> to show/hide. CRT design, frameless window, always on top. Draggable, resizable, opaque or ghost.',
      'sec2-num': '— five_panels',
      'sec2-title': 'All your activity,<br>in a single<br><span class="hl">phosphor</span> screen.',
      'sec2-c1-h': 'Session usage',
      'sec2-c1-p': 'Active session tokens, today\'s cost, cache hits, models and active projects. Burn rate and time left instantly.',
      'sec2-c2-h': 'Inventory',
      'sec2-c2-p': 'List of installed skills, their type and state. Like a JRPG inventory, but with Claude Code hooks inside.',
      'sec2-c3-h': 'Projects / quota',
      'sec2-c3-p': 'IDE observer: CPU/RAM of <code>code.exe</code> and <code>cursor.exe</code>, autocompletes and lines accepted per session.',
      'sec2-c4-h': 'Plan + hours',
      'sec2-c4-p': 'Local API on :11434, loaded model (Qwen 2.5 Coder 7B), tok/s speed and LLM CPU/RAM load.',
      'sec2-c5-h': 'The rest of the universe',
      'sec2-c5-p': '<strong>Antigravity</strong> panel with Gemini sessions, step counter and latest translation log. Arcade-style <strong>achievement system</strong> with rarity, and a <strong>config panel</strong> for language, scanlines, opacity and effects.',
      'sec3-num': '— zero_friction',
      'sec3-title': 'Three steps.<br>Zero <span class="hl">config</span>.',
      'sec3-s1-h': 'Download it',
      'sec3-s1-p': 'Portable ZIP for Windows. Native binaries for macOS and Linux, no local Claude Code env needed.',
      'sec3-s2-h': 'Hit the shortcut',
      'sec3-s2-p': '<strong>Alt+Shift+C</strong> to toggle the floating monitor. No extra windows, no clicks.',
      'sec3-s3-h': 'Live your life',
      'sec3-s3-p': 'Leave it on top or hide it. The window lives, the data changes, the form stays.',
      'sec3-foot': '<em>Requires Claude Code installed and a session started. Doesn\'t open anything: it just reads the local files under <code>~/.claude/projects</code> in your profile. Runs only on your machine.</em>',
      'sec4-tag': '— support',
      'sec4-d-h': 'Buy me a <span class="hl">coffee</span> ☕',
      'sec4-d-p': 'RETRO_DASH is MIT open source and always will be. If it saves you time, consider supporting maintenance.',
      'dm-1': 'Monthly or one-time. Integrated with the repo.',
      'dm-2': 'No account, no fees. A coffee = 3€.',
      'dm-3': 'Card or account. International.',
      'dm-4': 'ETH · SOL · BTC → wallet pending',
      'dm-copy': '[ COPY ]',
      'sec4-d-foot': '<em>Support goes to code, docs and the next release (achievements, metrics, plugins). Nothing goes to ads or telemetry.</em>',
      'sec5-tag': '— early_access',
      'sec5-h': 'Join the <span class="hl">list</span>.',
      'sec5-p': 'Get an email when the next release ships. No spam. No selling. One per month max.',
      'sec5-lbl': 'E-MAIL',
      'sec5-r1': 'Releases + news',
      'sec5-r2': 'Releases only',
      'sec5-btn': '[ UNLOCK ACCESS ]',
      'sec5-foot': 'No spam. One notice email. Discreet.',
      'sec5-meta': 'founder subscribers',
      'ft-tag': 'INDEPENDENT PROJECT · NOT AFFILIATED WITH ANTHROPIC, GOOGLE OR OPENAI',
      'ft-thanks': 'Made for people who live inside the terminal.'
    },
    pt: {
      'logo': 'RETRO_DASH_',
      'nav-features': '// funções',
      'nav-about': '// sobre',
      'nav-install': '// instalar',
      'donate': '[ DOAR ]',
      'hero-title-1': 'O TEU USO DE',
      'hero-title-2': 'CLAUDE CODE,',
      'hero-title-3': 'NO RETRO_DASH.',
      'hero-desc': 'Um widget de desktop que lê os teus ficheiros locais em tempo real: tokens, custo, limites do plano, skills e conquistas. Sem APIs, sem cloud, sem assinatura.',
      'cmd-text': 'descarregar',
      'cmd-os': '[ WINDOWS — 103 MB ]',
      'cmd-meta': 'Portátil. Sem instalação. Win 10/11. Pronto em < 5 min.',
      'cmd-foot': 'Linux e macOS compilam a partir do repo. Uma linha.',
      'stat-1': 'Histórico de atividade',
      'stat-2': 'Memória em repouso',
      'stat-3': 'Local · Open Source',
      'sec1-num': '— o_que_é',
      'sec1-title': 'O Claude Code não te diz<br>quanto gastas.<br><span class="hl">RETRO_DASH diz.</span>',
      'sec1-lead': 'Tu trabalhas na terminal e os tokens voam às cegas. RETRO_DASH lê os ficheiros de sessão locais <code>(~/.claude/projects)</code> e sincroniza o uso real do teu plano, sem abrir nada, para te mostrar o que realmente estás a gastar.',
      'sec1-c1-h': 'Dados reais, não estimativas',
      'sec1-c1-p': 'Lê cada sessão incremental: input, output, cache tokens, custo em euros por modelo, sessões do dia. O que vês é o que há.',
      'sec1-c2-h': 'Os teus limites do plano, sincronizados',
      'sec1-c2-p': 'Janela de 5 horas e limites semanais (todos os modelos: Sonnet, Opus, Haiku) sincronizados com a tua conta. Coincide com o painel ao digitar.',
      'sec1-c3-h': 'Flutua sobre tudo o resto',
      'sec1-c3-p': 'Atalho global <strong>Alt+Shift+C</strong> para abrir/fechar. Design CRT, janela sem moldura, sempre por cima. Arrastável, redimensionável, opaca ou fantasma.',
      'sec2-num': '— cinco_painéis',
      'sec2-title': 'Toda a tua atividade,<br>num único ecrã de<br><span class="hl">fósforo</span>.',
      'sec2-c1-h': 'Uso da sessão',
      'sec2-c1-p': 'Tokens da sessão ativa, custo de hoje, cache hit, modelos e projetos ativos. Burn rate e tempo restante ao instante.',
      'sec2-c2-h': 'Inventário',
      'sec2-c2-p': 'Lista de skills instaladas, o seu tipo e estado. Como o inventário de um JRPG, mas com hooks do Claude Code lá dentro.',
      'sec2-c3-h': 'Projetos / quota',
      'sec2-c3-p': 'IDE observer: CPU/RAM de <code>code.exe</code> e <code>cursor.exe</code>, autocompletes e linhas aceites por sessão.',
      'sec2-c4-h': 'Plano + horas',
      'sec2-c4-p': 'API local em :11434, modelo carregado (Qwen 2.5 Coder 7B), velocidade em tok/s e carga CPU/RAM do LLM.',
      'sec2-c5-h': 'O resto do universo',
      'sec2-c5-p': 'Painel <strong>Antigravity</strong> com sessões Gemini, contador de passos e log da última tradução. Sistema de <strong>conquistas</strong> estilo arcade com raridade, e <strong>painel de configuração</strong> com idioma, scanlines, opacidade e efeitos.',
      'sec3-num': '— zero_fricção',
      'sec3-title': 'Três passos.<br>Zero <span class="hl">configuração</span>.',
      'sec3-s1-h': 'Descarrega',
      'sec3-s1-p': 'ZIP portátil para Windows. Binários nativos para macOS e Linux sem ambiente local de Claude Code.',
      'sec3-s2-h': 'Carrega no atalho',
      'sec3-s2-p': '<strong>Alt+Shift+C</strong> para abrir/fechar o monitor flutuante. Sem janelas extra, sem cliques.',
      'sec3-s3-h': 'Vive a vida',
      'sec3-s3-p': 'Deixas sempre por cima ou escondes. A janela vive, os dados mudam, a forma fica.',
      'sec3-foot': '<em>Requer Claude Code instalado e uma sessão iniciada. Não abre nada: só lê os ficheiros locais em <code>~/.claude/projects</code> no teu perfil. Corre só na tua máquina.</em>',
      'sec4-tag': '— apoiar',
      'sec4-d-h': 'Oferece-me um <span class="hl">café</span> ☕',
      'sec4-d-p': 'RETRO_DASH é MIT open source e sempre será. Se te poupa tempo, considera apoiar a manutenção.',
      'dm-1': 'Mensal ou pontual. Integrado com o repo.',
      'dm-2': 'Sem conta, sem taxas. Um café = 3€.',
      'dm-3': 'Cartão ou conta. Internacional.',
      'dm-4': 'ETH · SOL · BTC → wallet pendente',
      'dm-copy': '[ COPIAR ]',
      'sec4-d-foot': '<em>O apoio vai para código, documentação e a próxima release (conquistas, métricas, plugins). Nada vai para publicidade ou telemetria.</em>',
      'sec5-tag': '— early_access',
      'sec5-h': 'Entra na <span class="hl">lista</span>.',
      'sec5-p': 'Recebe um email quando sair a próxima release. Sem spam. Sem te vender nada. Um por mês no máximo.',
      'sec5-lbl': 'E-MAIL',
      'sec5-r1': 'Releases + notícias',
      'sec5-r2': 'Só releases',
      'sec5-btn': '[ DESBLOQUEAR ACESSO ]',
      'sec5-foot': 'Sem spam. Um email de aviso. Discreto.',
      'sec5-meta': 'subscritores fundadores',
      'ft-tag': 'PROJETO INDEPENDENTE · NÃO AFILIADO A ANTHROPIC, GOOGLE OU OPENAI',
      'ft-thanks': 'Feito para gente que vive dentro da terminal.'
    }
  };

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.es;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem('retro_dash_lang', lang); } catch (e) {}
  }

  // Wire up language switcher
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  // Load saved language. Default to Spanish (project's primary audience),
  // fall back to browser locale only on explicit user switch.
  let savedLang = null;
  try { savedLang = localStorage.getItem('retro_dash_lang'); } catch (e) {}
  if (!savedLang || !['es', 'en', 'pt'].includes(savedLang)) {
    savedLang = 'es';
  }
  applyLang(savedLang);

  // ============================================
  // CRYPTO WALLET COPY BUTTON
  // ============================================
  document.querySelectorAll('.dm-copy').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = btn.dataset.copy || '';
      if (!text || text.includes('YOUR_WALLET_HERE')) {
        btn.textContent = '[ PENDIENTE ]';
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = '[ COPIADO ✓ ]';
        setTimeout(() => { btn.textContent = original; }, 1800);
      } catch (err) {
        btn.textContent = '[ ERROR ]';
      }
    });
  });

  // ============================================
  // WAITLIST FORM
  // ============================================
  const form = document.getElementById('waitlist-form');
  const msg = document.getElementById('waitlist-msg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('wl-email').value.trim();
      const dict = I18N[savedLang] || I18N.es;
      msg.classList.remove('success', 'error');

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.classList.add('error');
        msg.textContent = '> EMAIL INVÁLIDO';
        return;
      }

      // Simulated success. Wire to a real backend (Formspree, Buttondown, etc.) later.
      msg.classList.add('success');
      msg.textContent = '> ✓ ACCESO DESBLOQUEADO. REVISAR EMAIL.';
      document.getElementById('wl-email').value = '';
    });
  }

  // ============================================
  // CRYPTIC EASTER EGG: konami -> retro rain
  // ============================================
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) {
        konamiIdx = 0;
        startMatrixRain();
      }
    } else {
      konamiIdx = 0;
    }
  });

  function startMatrixRain() {
    if (document.getElementById('matrix-rain')) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:2000;pointer-events:none;opacity:0.18;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 14);
    const drops = Array(cols).fill(1);
    const chars = '01RETRODASH<>/{}[]#$%*+=-'.split('');
    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(5,10,5,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#33ff33';
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 50);
    setTimeout(() => {
      clearInterval(interval);
      canvas.remove();
    }, 5000);
  }
});
