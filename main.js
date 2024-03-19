const { app, BrowserWindow, ipcMain, clipboard, globalShortcut } = require('electron')
const { keyboard } = require('@nut-tree/nut-js');
const path = require('node:path')

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.setAlwaysOnTop(false, 'status');
}

app.whenReady().then(() => {
    let resultText = "";

    globalShortcut.register('Shift+G', async () => {
    // globalShortcut.register('CommandOrControl+G', async () => {
        mainWindow.webContents.send('isLoading', true);

        const fistTenchar = resultText.slice(0, 10);
        keyboard.config.autoDelayMs = 100;
        await keyboard.type(fistTenchar);

        keyboard.config.autoDelayMs = 10;
        const nextChar = resultText.slice(10);
        await keyboard.type(nextChar);
        mainWindow.webContents.send('isLoading', false);
    });
    
    ipcMain.handle('getClipboardText', () => clipboard.readText('selection'));
    ipcMain.handle('updateClipboardText', (event, text) => {
        resultText = text;
        // console.log("updated");
    });

    ipcMain.handle('setAlwaysOnTop', (event, flag)=> {
        mainWindow.setAlwaysOnTop(flag, 'status');
    });

    createWindow();

    // In contrast, macOS apps generally continue running even without any windows open.
    // Activating the app when no windows are available should open a new one.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

