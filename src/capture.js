const electron = require('electron'); // import electron module here
const fs = require('fs'); // import Nodejs fs module here
const path = require('path'); // import path module here

const { desktopCapturer, ipcRenderer: ipc, screen } = electron


function onCapture(evt, targetPath) {
  getMainSource(desktopCapturer, screen, source => {
    const png = source.thumbnail.toPng() // Conversion of the source file to png
    const myDate = new Date().toJSON().replace(new RegExp(':', 'g'),'.'); // Important esp for Window Users ( simply new Date() does not give a formattable value)
    const filePath = path.join(targetPath, myDate + '.png') // Define a directory to store the captured file
    writeScreenshot(png, filePath)
    console.log(new Date())
  })
} // Defines a function to handle the onCapture method

function getMainSource(desktopCapturer, screen, done) {
  const options = { types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize }
  desktopCapturer.getSources(options, (err, sources) => {
    if (err) return console.log('Cannot capture screen:', err)

    const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1'
    done(sources.filter(isMainSource)[0])
  })
}

function writeScreenshot(png, filePath){
  fs.writeFile(filePath, png, err => {
    if(err) return console.log('Failed to write Screen:', err);
  })
  console.log(filePath)
}

ipc.on('capture', onCapture) // Calls teh function on the 'On'