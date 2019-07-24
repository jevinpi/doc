# TS中扩展使用css-module
## 项目生成
项目是通过`create-react-app`进行生成的，默认会对`scss`进行扩展，例如我们对于文件名为`*.module.scss`的文件，可以用以下方法是用
```scss
body {
    .pipixia {
       font-size: 12px; 
    }
}
```
```jsx
import React from 'react';
import './App.css';
import style from './jevin.module.scss'

export default App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p className={style.pipixia}>css module</p>
      </header>
    </div>
  );
}
```
## 修改webpack配置
此时我们需要对 `create-react-app` 的默认配置进行自定义，这里我们使用 `react-app-rewired` （一个对 `create-react-app` 进行自定义配置的社区解决方案）。
```javascript
npm i react-app-rewired customize-cra --save
```
修改package.json
```javascript
/* package.json */
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
}
```
然后在项目根目录创建一个`config-overrides.js`用于修改默认配置。
```javascript
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
    }),
);
```
此后，我们即可在项目组使用less。但是此时仅支持使用`import 'index.less'`写法，无法使用css-module。

## 扩展less支持css-module
由于`react-scripts`只默认支持scss，`create-react-app`版本2以上，修改设置通过[customize-cra](https://github.com/arackaf/customize-cra)进行设置。
在`src`下创建`react-app.d.ts`文件，在里面加入
```javascript
/// <reference types="react-scripts" />

declare module "*.module.less" {
    const classes: { [key: string]: string };
    export default classes;
}
```
重新启动项目，即可支持less使用`css-module`,即

```jsx
import React from 'react';
import './App.css';
import style from './jevin.module.less'

export default App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p className={style.pipixia}>css module</p>
      </header>
    </div>
  );
}
```