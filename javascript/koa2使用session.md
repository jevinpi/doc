# <center>koa2中session的使用</center>
koa的快速生成可以使用koa-generater
```javascript
npm i koa-generator -g
koa2 project-name
```

## 下载依赖库
```javascript
npm i koa-mysql-session koa-session-minimal --save
```

## 配置启动文件
```javascript
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

// 配置存储session信息的mysql
let store = new MysqlSession({
  user: 'root',
  password: 'abc123',
  database: 'koa_demo',
  host: '127.0.0.1',
})

// 存放sessionId的cookie配置
let cookie = {
  maxAge: '', // cookie有效时长
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: ''
}

// 使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))
```

## 在路由中使用
```javascript
const router = require('koa-router')()
// 设置session
router.get('/login', async (ctx) {
  ctx.session = {
    name: 'test',
    isLogin: true
  }
})

// 获取session
router.get('/get', async (ctx) {
  console.log(ctx.session)
})
```