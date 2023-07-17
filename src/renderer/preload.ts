import { ipcRenderer } from "electron";

export const api = {
  setWindowTitle: (title: string) => {
    ipcRenderer.send("setWindowTitle", title);
  },
};

window.api = api;
