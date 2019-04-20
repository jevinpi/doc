/**
 * 异步读取文件，返回一个Promise对象
 * @param {string} url 文件地址
 * @param {string} code 编码格式，默认utf-8
 */
function readFile (url, code='utf-8') {
  return new Promise((resolve, reject) => {
    fs.readFile(url, code, (err, data) => {
      if (err) {
        throw err
      } else {
        resolve(data)
      }
    })
  })
}

export default readFile