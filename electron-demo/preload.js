const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  versions: process.versions,
  saveFile: (data) => {
    ipcRenderer.send("file-save", data);
  },
  readFile: () => {
    return ipcRenderer.invoke("file-read");
  },
});
