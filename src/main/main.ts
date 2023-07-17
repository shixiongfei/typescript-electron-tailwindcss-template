import { app, BrowserWindow, ipcMain, screen } from "electron";
import { Menu, MenuItemConstructorOptions } from "electron";

const openSplashWindow = (onStartup: (splashWindow: BrowserWindow) => void) => {
  const splashWindow = new BrowserWindow({
    width: 830,
    height: 480,
    useContentSize: true,
    show: false,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  splashWindow.webContents.once("did-finish-load", () => {
    splashWindow.show();
    splashWindow.center();

    onStartup(splashWindow);
  });

  splashWindow.loadURL(SPLASH_WINDOW_WEBPACK_ENTRY);
};

const openMainWindow = (splashWindow?: BrowserWindow) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    title: "Electron Startup App",
    width: width,
    height: height,
    minWidth: 960,
    minHeight: 600,
    show: false,
    icon: "./icons/favicon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.webContents.once("did-finish-load", () => {
    splashWindow?.close();
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on("page-title-updated", (event) => {
    event.preventDefault();
  });

  ipcMain.on("setWindowTitle", (_, title: string) => {
    mainWindow.setTitle(title);
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

const createWindow = () => {
  openSplashWindow(openMainWindow);
};

app.whenReady().then(() => {
  if (process.platform === "darwin") {
    const menu = Menu.buildFromTemplate([
      {
        label: app.name,
        submenu: [
          ...((process.env.ELECTRON_ENV === "development"
            ? [
                {
                  label: "Toggle Developer Tools",
                  accelerator: "Alt+Command+I",
                  click: (_, window) => window?.webContents.toggleDevTools(),
                },
              ]
            : []) as MenuItemConstructorOptions[]),
          { label: "Quit", accelerator: "Command+Q", click: () => app.quit() },
        ],
      },
    ]);
    Menu.setApplicationMenu(menu);
  } else {
    Menu.setApplicationMenu(null);
  }

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
