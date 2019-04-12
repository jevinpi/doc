# <center>LOL英雄爬虫</center>
使用`superagent`和`cheerio`爬取LOL官网上的所有英雄和图片

## 代码
## 爬取全部英雄和类型以及英雄小图标
```javascript
const path = require('path');
const superagent = require('superagent');
require('superagent-charset')(superagent)
const cheerio = require('cheerio');
const fs = require('fs')
const http = require('http')

const dirs = ['images', 'data', 'hero']
// 生成文件夹
for (let dir of dirs) {
  fs.access('./' + dir, function (err) {
    if (err) {
      fs.mkdirSync('./' + dir)
    }
  })
}

const herosUlr = 'http://lol.qq.com/biz/hero/champion.js';

/**
 * 获取全部英雄
 * @param {string} url 
 */
async function getHeros (url) {
  return new Promise ((resolve, reject) => {
    http.get(url, function (res) {
      var data = ''
      res.on('data', function (chunk) {
        data += chunk
      })
    
      res.on('end', function () {
        let json = data.match(/LOLherojs.champion=(\S*);/)
        if (json) {
          const heros = JSON.parse(json[1])
          resolve(heros)
        } else {
          resolve({
            keys: {},
            data: {}
          })
        }
      })
    })
  })
}

const url = 'http://lol.qq.com/data/info-heros.shtml';
// console.log('开始···')
function getData(url) {
  return new Promise((resolve, reject) => {
    superagent
    .get(url)
    .charset('gbk')
    .end((err, res) => {
      let $ = cheerio.load(res.text,{decodeEntities: false})
      resolve($)
    })    
  })
}

/**
 * 下载英雄图片
 * @param {string} img 
 */
function saveNetImg (img) {
  let url = 'http://ossweb-img.qq.com/images/lol/img/champion/' + img
  let name = path.resolve(__dirname, 'hero', img)
  console.log('开始下载' + img)
  http.get(url , function (res) {
    let imgData = ''
    try {
      res.setEncoding('binary')
      res.on('data', function (chunk) {
        imgData += chunk;
      })
      res.on('end', function () {
        fs.writeFile(name, imgData, 'binary', function (err) {
          if (err) {
            console.log('err')
          } else {
            console.log(img + '下载成功')
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
}

/**
 * 加载本地数据，查看本地数据版本
 */
function getLocal() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/heros.json', {encoding: 'utf-8' }, function (err, res) {
      if (err) {
        throw err;
      }
      resolve(res)
    })
  })
}

function checkFile () {
  return new Promise((resolve, reject) => {
    fs.access('./data/heros.json', function (err) {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

async function start () {
  // 本地是否有缓存的数据
  const hasHeros = await checkFile();
  // 获取所有英雄数据
  const heros = await getHeros(herosUlr);
  if (hasHeros) {
    const local = await getLocal();
    const localTime = JSON.parse(local).updated
    // 已是最新版本，无需处理
    if (new Date(localTime >= new Date(heros.updated))) console.log('当前已是最新版本的数据，无需更新');return null;
  }
  console.log('******************** 当前版本', heros.version, '******************** 更新时间', heros.updated)
  for (let id in heros.data) {
    let  hero = heros.data[id]
    saveNetImg(hero.image.full)
  }
  // JSON.parse后重新stringify是为了将中文转码
  let herosPath = path.resolve(__dirname, 'data', 'heros.json')
  console.log('****************开始写入heros.json*************************')
  fs.writeFile(herosPath, JSON.stringify(heros), 'utf-8', function (err) {
    if (err) {
      throw err;
    }
    console.log('****************写入heros.json结束*************************')
  })
  // 获取所有英雄类型
  const $ = await getData(url);
  let tags = {}
  $('#seleteChecklist li label').each((idx, elt) => {
    if ($(elt).data('id')) {
      tags[$(elt).data('id')] = $(elt).text()
    }
  })
}

start()

```