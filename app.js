const electron = require('electron');
const url = require('url');
const path = require('path');

// pulling in objects from electron
const {app, BrowserWindow, Menu} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function() {

    // create new window
    mainWindow = new BrowserWindow({});

    // load html file into window
    // this will build a path that looks like this
    // file://dirname/mainWindow.html
    mainWindow.loadURL(url.format({
        protocol: 'file:',
        slashes: true,
        pathname: path.join(__dirname, 'mainWindow.html')
    }));

    // Build Menu From Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
});

// handle createAddWindow()
function createAddWindow() {
    // create new window
    addWindow = new BrowserWindow({
        width: 300,
        height:200,
        title: 'Add Shopping List Item'
    });
    // load html into window
    addWindow.loadURL(url.format({
        protocol: 'file:',
        slashes: true,
        pathname: path.join(__dirname, 'addWindow.html')
    }));
}

// create menu template
const mainMenuTemplate = [
    {
        label: 'File', 
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                // shortcut
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];