// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView, dialog, Tray, Menu, ipcMain} = require('electron')
require('./menu')
const path = require('path')

let mainWindow, tray

// function createRemindWindow (task) {
//   remindWindow = new BrowserWindow({
//      //options
//   })
//   remindWindow.loadURL(`file://${__dirname}/index.html`)
//   //主进程发送消息给渲染进程
//   remindWindow.webContents.send('setTask', task)

// }

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      backgroundThrottling: false,   //设置应用在后台正常运行
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,   //设置能在页面使用nodejs的API
      contextIsolation: false,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // mainWindow.set
  // Open the DevTools.
  // BrowserView.webContents.openDevTools()
  // mainWindow.webContents.openDevTools()

  const view = new BrowserView()
  mainWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 400, width: 1000, height: 680 })
  view.webContents.loadURL('https://www.lingobus.com')

  // ipc通信
  ipcMain.on('mainWindow:close', () => {
    mainWindow.hide()
  })
  ipcMain.on('mainWindow:full', () => {
    mainWindow.maximize()
  })

  //主进程发送消息给渲染进程
  // createRemindWindow('xxxxxxxxx')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  // dialog.showOpenDialog({
  //   title: 'zlhnb',
  //   defaultPath: './images/',
  //   filters: [{name: 'img', extensions: ['jpg']}],
  //   buttonLabel: 'zlhnbYa',
  // }).then(res => {
  //   console.log(res, '???')
  //   // res.filePaths
  // })
  setTimeout(() => {
    // 弹框
    // dialog.showMessageBox({
    //   type: 'warning',
    //   title: 'zlhnb',
    //   message: 'xxxxxxxxxxx',
    //   buttons: [
    //     '去',
    //     '不去'
    //   ]
    // }).then(res => {
    //   console.log(res, 'res')
    // })
  }, 1000);

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // 系统托盘
  const iconPath = path.join(__dirname, './images/icons/panda.png');
  tray = new Tray(iconPath)      //实例化一个tray对象，构造函数的唯一参数是需要在托盘中显示的图标url  
  
  tray.setToolTip('Tasky')       //鼠标移到托盘中应用程序的图标上时，显示的文本
  let num = 0
  tray.on('click', () => {       //点击图标的响应事件，这里是切换主窗口的显示和隐藏
    num += 1
    console.log('tray click', num)
    console.log(mainWindow)
    if(mainWindow.isVisible()){
      mainWindow.hide()
    }else{
      mainWindow.show()
    }
  })
  
  tray.on('right-click', () => {    //右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ])
    tray.popUpContextMenu(menuConfig)
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
