const fs = require('fs')
const http = require('http')

// 生成文件夹
fs.access('./images', function (err) {
  if (err) {
    fs.mkdirSync('./images')
  }
})

var url = 'http://alipic.lanhuapp.com/psd5636283b8826e8d-6633-4e4d-90a2-5a2440bd93b3'
/**
 * 下载网络资源
 * @param {string} url 
 * @param {string} savepath
 */
function saveNetImg (url, savepath) {
  http.get(url , function (res) {
    let imgData = ''
    res.setEncoding('binary')
    try {
      res.on('data', function (chunk) {
        imgData += chunk;
      })
      res.on('end', function () {
        fs.writeFile(savepath, imgData, 'binary', function (err) {
          if (err) {
            console.log('err')
          } else {
            console.log('保存成功')
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
}

saveNetImg(url, '图片.png')

/**
 * 下载服务器本地资源
 * @param {string} url 
 */
function loadLocalImg (url) {
  var stream = fs.createReadStream(url)
  var response = []
  if (stream) {
    stream.on('data', function (chunk) {
      response.push(chunk)
    })
  
    stream.on('end', function () {
      var finalData = Buffer.concat(response)      
      // 转换为base64
      // finalData = finalData.toString('base64')
      // 在此处可以将内容发给客户端，例如上下文ctx
      // ctx.body = finalData
      fs.writeFile('./images/lanhu2.png', finalData, 'binary', function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('stream 保存成功')
        }
      })
    })
  }
}

loadLocalImg('./img/亚索1.jpg')