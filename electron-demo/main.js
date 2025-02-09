const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("./src/index.html");
};

const saveFile = (event, data) => {
  console.log("saveFile =", data);
  fs.writeFileSync("./data/hello.txt", data);
};

const readFile = () => {
  return fs.readFileSync("./data/hello.txt").toString();
};

app.on("ready", () => {
  console.log("应用准备完毕");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.on("file-save", saveFile);
  ipcMain.handle("file-read", readFile);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
