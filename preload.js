const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Request initial data from main
  requestInitialData: () => ipcRenderer.send('request-initial-data'),

  // Listeners for updates from main
  onInitialData: (callback) => {
    ipcRenderer.on('initial-data', (event, data) => callback(data));
  },
  onActiveSessionStatus: (callback) => {
    ipcRenderer.on('active-session-status', (event, status) => callback(status));
  },
  onActiveSessionUsage: (callback) => {
    ipcRenderer.on('active-session-usage', (event, usage) => callback(usage));
  },
  onSessionNewEvent: (callback) => {
    ipcRenderer.on('session-new-event', (event, entry) => callback(entry));
  },
  onSystemProcesses: (callback) => {
    ipcRenderer.on('system-processes', (event, processes) => callback(processes));
  },

  // Window control commands
  closeWindow: () => ipcRenderer.send('window-control', 'close'),
  minimizeWindow: () => ipcRenderer.send('window-control', 'minimize')
});
