const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const electronReload = require('electron-reload')

if (process.env.NODE_ENV === 'development') {
  electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      contentSecurityPolicy: "default-src 'self' https://localhost https://api.spotify.com"
    },
  });
  win.loadURL('http://localhost:3000');
}


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});