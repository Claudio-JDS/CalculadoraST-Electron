const {app, BrowserWindow, ipcMain, dialog} = require('electron')

let mainWindow;



app.on('ready', ()=> {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })


  mainWindow.loadFile('./index.html')
  ipcMain.handle('dialog', (event, method, params) => {       
    dialog[method](params);
  });
})



