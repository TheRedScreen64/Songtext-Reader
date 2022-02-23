//Import
const { app, BrowserWindow, autoUpdater, dialog  } = require('electron')
const fs = require('fs');
require('update-electron-app')()


let mainWindow

const server = 'https://github.com'
const url = `${server}/TheRedScreen64/Songtext-Reader/releases/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

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

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
})

autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
})