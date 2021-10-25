const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let loginWindow;
let mainWindow;

const createLoginWindow = () => {
  loginWindow = new BrowserWindow(
    Object.assign({
      width: 635,
      height: 422,
      resizeable: false,
      transparent: true,
      frame: false,
      hasShadow: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    })
  );

  loginWindow.loadFile(path.join(__dirname, "html/key.html"));
  loginWindow.on("closed", () => (loginWindow = null));
  loginWindow.webContents.on("did-finish-load", () => {
    loginWindow.show();
  });
};


const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 740,
    frame: false,
    transparent: true,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    show: false,
  });

  mainWindow.loadFile(path.join(__dirname, "html/index.html"));

  ipcMain.on("redirect", () => {
    if (loginWindow) {
      loginWindow.hide();
    }
    mainWindow.show();
  });
  ipcMain.on("redirect1", () => {
    if (mainWindow) {
      mainWindow.hide();
    }
    loginWindow.show();
  });
};


app.once("ready", () => {
  createLoginWindow();
  createMainWindow();
});

/*
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    frame: false,
    transparent: true,
    hasShadow: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "html/key.html"));
  mainWindow.webContents.openDevTools();
});
*/