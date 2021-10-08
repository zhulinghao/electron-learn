// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require('fs')
const path = require('path')
//页面的js代码：
const electron = require('electron')
const { ipcRenderer } = electron

window.onload = () => {
  const heroBtn = document.querySelector('#heroBtn')
  const heroContainer = document.querySelector('#heroContainer')
  heroBtn.onclick = () => {
    fs.readFile('./hero.txt', (err, data) => {
      console.log(data, 'data')
      heroContainer.innerHTML = data
    })
  }

  document.querySelector('#openBtn').addEventListener('click', () => {
    
    window.open(path.join(__dirname, 'child.html'))
  })
  // IPC Inter-Process Communication 进程间通信
  document.querySelector('#closeBtn').addEventListener('click', () => {
    ipcRenderer.send('mainWindow:close')
  })

  document.querySelector('#fullBtn').addEventListener('click', () => {
    ipcRenderer.send('mainWindow:full')
  })

  console.log('setTask ?????')
  ipcRenderer.on('setTask', (event, task) => {
    console.log(event, 'event');
    console.log(task, 'task');
  })
}

window.addEventListener('message', msg => {
  document.querySelector('#childMessage').innerHTML = msg.data
})

window.addEventListener('online', () => {
  alert('online')
})

window.addEventListener('offline', () => {
  alert('offline')
})

// const {remote, getCurrentWindow} = require('electron')
// const { Menu, MenuItem } = remote
// // 右键菜单
// const menu = new Menu()
// const currenWindow = getCurrentWindow()
// const menuItem = new MenuItem({
//   label: '打开devtools',
//   click: () => {
//     currenWindow.webContents.openDevTools()
//   }
// })
// menu.append(menuItem)
// window.addEventListener('contextmenu', function (e) {
//   e.preventDefault();    
//   menu.popup(currenWindow);
// }, false);

// 外部打开链接
const { shell } = require('electron')
const outlinks = document.querySelectorAll('[link-out]')
console.log(outlinks, 'outlinks')
for (let i = 0; i < outlinks.length; i++) {
  const outlink = outlinks[i];
  outlink.addEventListener('click', function (e) {
    e.preventDefault()
    const href = this.getAttribute('href')
    console.log(href, 'href')

    shell.openExternal(href)
  })
}
