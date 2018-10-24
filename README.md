### 介绍
`mobileUtils`是项目中经常用的小工具包含以下内容
1. easeVerticalScroll(带有缓动效果的滚动)
2. EleDistanceEle(读取子元素与父元素之间的距离)

### 怎么使用
```javascript
npm install --save mobileUtils

// ES6规范
import { easeVerticalScroll, EleDistanceEle } from 'mobileUtils'

// commonjs
let { easeVerticalScroll, EleDistanceEle } = require('mobileUtils')

// html引入
<script src="https://js-1252842252.cos.ap-shanghai.myqcloud.com/mobileUtils1.0.0/index.min.js"></script>
```

#### easeVerticalScroll缓动效果的滚动
```javascript
easeVerticalScroll(target, scrollDOM)
```
参数 | 是否必传 | 类型 | 简介
--- | --- | --- | ---
target | true | Element | 要滚动到指定位置的元素
scrollDOM | true | Element | 目标元素`target`处于的滚动元素

#### EleDistanceEle子元素与父元素之间的距离
```javascript
EleDistanceEle(childEle, parentEle)
```
参数 | 是否必传 | 类型 | 简介
--- | --- | --- | ---
childEle | 是 | Element | 子元素
parentEle | 是 | Element | 父元素