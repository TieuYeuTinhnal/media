const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    backgroundColor: '#1e1e1e',
    title: 'Spine Particle Studio'
  });

  mainWindow.loadFile('index.html');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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

// IPC handlers for file dialogs
ipcMain.handle('save-project', async (event, projectData) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Save Project',
    filters: [
      { name: 'Particle Project', extensions: ['json'] }
    ],
    defaultPath: 'particle-project.json'
  });

  if (!result.canceled && result.filePath) {
    try {
      fs.writeFileSync(result.filePath, JSON.stringify(projectData, null, 2));
      return { success: true, path: result.filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, canceled: true };
});

ipcMain.handle('load-project', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Load Project',
    filters: [
      { name: 'Particle Project', extensions: ['json'] }
    ],
    properties: ['openFile']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    try {
      const data = fs.readFileSync(result.filePaths[0], 'utf8');
      return { success: true, data: JSON.parse(data), path: result.filePaths[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, canceled: true };
});

ipcMain.handle('export-spine', async (event, spineData) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Export Spine Animation',
    filters: [
      { name: 'Spine JSON', extensions: ['json'] }
    ],
    defaultPath: 'particle-animation.json'
  });

  if (!result.canceled && result.filePath) {
    try {
      fs.writeFileSync(result.filePath, JSON.stringify(spineData, null, 2));
      return { success: true, path: result.filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, canceled: true };
});

ipcMain.handle('load-texture', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Load Texture',
    filters: [
      { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'bmp', 'gif'] }
    ],
    properties: ['openFile']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return { success: true, path: result.filePaths[0] };
  }
  return { success: false, canceled: true };
});
