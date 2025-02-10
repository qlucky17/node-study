import { app, BrowserWindow } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
