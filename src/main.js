const electron = require('electron'); // Import module electron

const {app , BrowserWindow, globalShortcut} = electron

let mainWindow

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    resizable : false,
    frame: false
  }) // creates a hidden window

  //mainWindow.openDevTools()

  mainWindow.loadURL(`file://${__dirname}/capture.html`) // points it to a HTML file and locates the directory the file is in

  mainWindow.on('close', _ => {
    mainWindow = null // sets the main window to nulland closes it
  })

  globalShortcut.register('CmdOrCtrl+Alt+D', _ => {
    mainWindow.webContents.send('capture', app.getPath('pictures'))
    console.log(app.getPath('pictures'));
  }) // Regsiters teh global shortcut

})