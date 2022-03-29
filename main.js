const { app, BrowserWindow, autoUpdater, dialog  } = require('electron')

let mainWindow

//Functions
function createWindow () {
    mainWindow = new BrowserWindow({
        icon: __dirname + '/res/icon.ico',
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 300
    })
  
    mainWindow.loadFile('index.html')
    mainWindow.removeMenu()
    // mainWindow.webContents.openDevTools()

    require('update-electron-app')({
        repo: 'TheRedScreen64/Songtext-Reader',
        logger: require('electron-log')
    })

    mainWindow.on('close', () => {
        app.quit()
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
      createWindow();
    }
});