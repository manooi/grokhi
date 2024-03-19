const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fromParent', {
    getClipboardText: () => ipcRenderer.invoke('getClipboardText'),
    updateClipboardText: (text) => ipcRenderer.invoke('updateClipboardText', text),
    getStatus: (callback) => {
        ipcRenderer.on('isLoading', (event, status) => {
            callback(status);
        });
    },
    setAlwaysOnTop: (flag) => ipcRenderer.invoke('setAlwaysOnTop', flag),
});