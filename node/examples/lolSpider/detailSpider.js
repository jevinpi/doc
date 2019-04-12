const path = require('path');
const superagent = require('superagent');
require('superagent-charset')(superagent)
const cheerio = require('cheerio');
const fs = require('fs')
const http = require('http')
const saveNetImage = require('./utils')

const detailUrl = 'http://lol.qq.com/data/info-defail.shtml'
const heroJsUrl = 'http://lol.qq.com/biz/hero/'
const passiveUrl = 'http://ossweb-img.qq.com/images/lol/img/passive/'
const spellUrl = 'http://ossweb-img.qq.com/images/lol/img/spell/'
const skinUrl = 'http://ossweb-img.qq.com/images/lol/web201310/skin/'


function getDetailPage(id) {
  return superagent.get(detailUrl).query({id})
  // return new Promise((resolve, reject) => {
  // })
}

function getDetail(id) {
  return new Promise((resolve, reject) => {
    const heroJs = heroJsUrl + id + '.js';
    http.get(heroJs, function(res) {
      let data = '';
      res.on('data', function(chunk) {
        data += chunk;
      })
      const reg = new RegExp('LOLherojs.champion.'+ id +'=((\\S|\\s)*);')
      res.on('end', function () {
        let json = data.match(reg)
        if (json) {
          const hero = JSON.parse(json[1])
          resolve(hero)
        } else {
          resolve(null)
        }
      })
    })
  })
}

async function getHero(id) {
  // let res = await getDetailPage('Aatrox')
  // let $ = cheerio.load(res.text, {decodeEntities: false})
  // 英雄信息
  let hero = await getDetail(id)
  if (hero) {
    const jsonPath = path.resolve(__dirname, 'hero/json', id + '.json')
    // 英雄信息文件
    fs.writeFile(jsonPath, JSON.stringify(hero), 'utf-8', function (err) {
      if (err) throw err;
    })
    // passive（被动）图片
    const passiveName = hero.data.passive.image.full;
    const passivePath = path.resolve(__dirname, 'hero/passive');
    saveNetImage(passiveUrl, passivePath, passiveName)
    // skin（皮肤）图片
    for (let skin of hero.data.skins) {
      const skinNameBig = 'big' + skin.id + '.jpg'
      const skinNameSmall = 'small' + skin.id + '.jpg'
      const skinPath = path.resolve(__dirname, 'hero/skin');
      saveNetImage(skinUrl, skinPath, skinNameBig)
      saveNetImage(skinUrl, skinPath, skinNameSmall)
    }
    // spell（技能）图片
    for (let spell of hero.data.spells) {
      const spellName = spell.image.full
      const spellPath = path.resolve(__dirname, 'hero/spell');
      saveNetImage(spellUrl, spellPath, spellName)
    }
  }
}
module.exports.getHero = getHero;