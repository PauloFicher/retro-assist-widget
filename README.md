# RETRO_DASH

> Widget de escritorio retro-CRT open source para monitorizar **Claude Code, Gemini (Antigravity), Codex y OpenCode** en tiempo real.

```
______ _____ ___________ _____  ______  ___   _____ _   _
| ___ \  ___|_   _| ___ \  _  | |  _  \/ _ \ /  ___| | | |
| |_/ / |__   | | | |_/ / | | | | | | / /_\ \\ `--.| |_| |
|    /|  __|  | | |    /| | | | | | | |  _  | `--. \  _  |
| |\ \| |___  | | | |\ \\ \_/ / | |/ /| | | |/\__/ / | | |
\_| \_\____/  \_/ \_| \_|\___/  |___/ \_| |_/\____/\_| |_/
```

```
> descargar_
[ WINDOWS — 103 MB ]
Portable. Sin instalación. Win 10/11. Listo en < 5 min.
```

## ✨ Qué hace

Un panel flotante con estética CRT (fósforo verde) que **lee tus archivos de sesión locales** y te muestra en directo:

- **Claude Code** — tokens input/output, cache writes/reads, coste estimado en USD, PID activo, plan (Pro/Max/Team).
- **Antigravity (Gemini)** — sesiones, total de pasos, log de la última traducción.
- **Codex / Cursor** — carga CPU/RAM de los IDEs, autocompletados, líneas aceptadas.
- **OpenCode** — API local en :11434, modelo cargado, velocidad tok/s, uso CPU/RAM del LLM.
- **Sistema de logros** — 8 achievements desbloqueables (FIRST_BLOOD, HEAVY_LOADER, CACHE_WHISPERER, GEMINI_CADET, EXPERT_CODER, POWER_USER, NIGHT_OWL, SYSTEM_OVERLOAD).
- **Configuración** — idioma (es/en/pt), scanlines (alto/medio/off), flicker, opacidad, sonido.

**Atajo global:** `Alt+Shift+C` para mostrar/ocultar.

## 🔒 Privacidad

- **No** se llama a ninguna API externa.
- **No** hay telemetría ni tracking.
- **No** se abre nada: solo lee los archivos de sesión bajo tu perfil de usuario (`~/.claude/projects`, `~/.gemini/antigravity/brain`).
- **No** se envía nada a ningún servidor. Todo corre 100% en tu máquina.

## 🚀 Instalación

### Windows
1. Ve a [Releases](https://github.com/PauloFicher/retro-assist-widget/releases/latest).
2. Descarga `RetroAssistWidget-win32-x64.zip`.
3. Descomprime donde quieras.
4. Ejecuta `RetroAssistWidget.exe`.

### Desde el código fuente
```bash
git clone https://github.com/PauloFicher/retro-assist-widget
cd retro-assist-widget
npm install
npm start
```

## 🛠️ Stack

- **Electron 30** — shell + IPC + global shortcuts.
- **Vanilla JS / HTML / CSS** — sin frameworks, sin build step de UI.
- **CSS variables** — 4 temas completos (Claude verde, Gemini cian, Codex ámbar, OpenCode matrix).

## 📂 Estructura

```
retro-assist-widget/
├── main.js          # Proceso principal de Electron (lectura de logs, IPC)
├── preload.js       # Bridge seguro contextIsolation
├── renderer.js      # UI + render de paneles + i18n + achievements
├── index.html       # Estructura del widget
├── style.css        # CRT theme, scanlines, glow
├── package.json     # electron + electron-packager
└── landing/         # Landing page (deployable a Vercel)
    ├── index.html
    ├── style.css
    └── script.js
```

## 🤝 Contribuir

Issues y PRs bienvenidos. La licencia es MIT — fork freely, mantén el crédito.

## ☕ Apoyar

RETRO_DASH es open source y siempre lo será. Si te ahorra tiempo:

- [GitHub Sponsors](https://github.com/sponsors/PauloFicher)
- [Ko-fi](https://ko-fi.com/pauloespinola)
- [PayPal.Me](https://paypal.me/pauloespinola)
- Crypto (ETH/SOL/BTC) → ver landing

## 📜 Licencia

MIT — Copyleft 2026 Paulo Espínola.
