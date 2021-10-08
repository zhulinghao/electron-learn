const { Menu, BrowserWindow} = require('electron')

const tempate = [
  {
    label: '',
    submenu: [
      { 
        label: 'Devtools',
        accelerator: 'ctrl+n',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.openDevTools()
        }
      }
    ]
  },
  {
    label: '菜单2',
    submenu: [
      { label: '菜单2-1' }
    ]
  }
]

const b = Menu.buildFromTemplate(tempate)

Menu.setApplicationMenu(b)
