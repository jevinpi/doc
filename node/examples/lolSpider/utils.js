const fs = require('fs')
const http = require('http')
const path = require('path')

/**
 * 下载网络资源
 * @param {string} url 
 * @param {string} path
 */
function saveNetImg11 (url, path) {
  new Promise(() => {
    http.get(url , function (res) {
      let imgData = ''
      res.setEncoding('binary')
      res.on('data', function (chunk) {
        imgData += chunk;
      })
      res.on('end', function () {
        fs.writeFile(path, imgData, 'binary', function (err) {
          if (err) {
            throw err
          } else {
            console.log('保存成功')
          }
        })
      })
    })
  })
}

/**
 * 下载网络图片
 * @param {string} url 网络图片地址
 * @param {string} path 本地存储路径
 * @param {string} name 文件名称
 */
function saveNetImg (url, savepath, name) {

  new Promise(() => {
    http.get(url + name , function (res) {
      let imgData = ''
      res.setEncoding('binary')
      res.on('data', function (chunk) {
        imgData += chunk;
      })
      res.on('end', function () {
        fs.writeFile(path.resolve(savepath, name), imgData, 'binary', function (err) {
          if (err) {
            throw err
          }
        })
      })
    })
  })
}
module.exports = saveNetImg