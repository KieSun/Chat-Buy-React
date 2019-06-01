<p align="center">
<img src="https://img.shields.io/badge/Language-%20JavaScript%20-f9e229.svg">
<a href="https://github.com/halfrost/vue-objccn/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-GPL-blue.svg"></a>
</p>

利用 React / Node 实现的应用。项目不怎么复杂，但是五脏六腑俱全，适合新手学习。

[English](https://github.com/KieSun/Chat-Buy-React/blob/master/README-EN.md)

[博客总结](https://juejin.im/post/5a490d8051882511793e8a5f)


## 技术栈和主要框架

📦 React 全家桶：react + redux + react-router 4.0 + immutable.js  
📌 ES6 + ES7     
📡 网络请求：axios + socket.io
🎈 页面相应式框架：antd mobile  
✏️ 后台：express + mongoDB

## 项目运行（nodejs 6.0+）
``` bash
# 克隆到本地
git clone https://github.com/KieSun/Chat-Buy-React.git
cd chat-buy-react

# Mac 安装MongoDb (如果命令行因为网络问题安装不了，可以直接去 https://www.mongodb.com/download-center#community 下载
brew install mongodb

# 启动MongoDb（安装成功后命令行有提示）
mongod --config /usr/local/etc/mongod.conf

# 连接到mongo
mongo

# 安装依赖
npm install

# 全局安装 nodemon 
npm i nodemon -g

# 开启后端 (Mac)
npm run server

# 开启后端 (Windows)
npm run dev

# 开启本地服务器
npm start

# 发布环境
npm run build
```

## 项目截图

![登录](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-034346.gif)
![商品购买](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-034347.gif)
![订单](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-034349.gif)
![聊天](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-034351.gif)

## 文件结构

```
── server                         // 后端文件夹
│   ├── chat.js                   // 聊天接口
│   ├── foods.json                // 商品 json
│   ├── goods.js                  // 商品接口
│   ├── jwtMiddleware.js          // token 中间件
│   ├── key.js                    // 加密 token key
│   ├── model.js                  // 数据库结构
│   ├── order.js                  // 订单接口
│   ├── server.js                 // 后端 index
│   ├── socket.js                 // socket接口
│   └── user.js                   // 用户信息接口
├── src
│   ├── actions                   // Redux action
│   │   ├── chat.js
│   │   ├── goods.js
│   │   ├── order.js
│   │   ├── type.js
│   │   └── user.js
│   ├── asyncComponent.jsx        // 路由分割组件
│   ├── common
│   │   ├── axiosMiddleware.js    // axios 拦截器
│   │   ├── history.js            
│   │   └── unit.js               // 通用函数
│   ├── components
│   │   ├── allOrders             // 所有订单组件
│   │   │   └── list.jsx
│   │   ├── common
│   │   │   └── 404.jsx
│   │   ├── goods
│   │   │   ├── buy.jsx           // 购买组件
│   │   │   └── goodsList.jsx     // 商品列表组件
│   │   ├── login
│   │   │   └── loginForm.jsx     // 登录组件
│   │   ├── message
│   │   │   ├── chatList.jsx      // 聊天列表组件
│   │   │   ├── chatListItem.jsx  // 聊天列表 item 组件
│   │   │   └── messageList.jsx   // 所有消息组件
│   │   ├── myOrder
│   │   │   ├── myOrder.jsx       // 我的订单列表组件
│   │   │   └── myOrderItem.jsx   // 我的订单列表 item 组件
│   │   ├── navBar
│   │   │   └── backNavBar.jsx    // 导航栏组件
│   │   └── register
│   │       └── registerForm.jsx  // 注册组件
│   ├── container                 // 组件容器
│   │   ├── allOrders.jsx
│   │   ├── chat.jsx
│   │   ├── dashboard.jsx
│   │   ├── goods.jsx
│   │   ├── login.jsx
│   │   ├── message.jsx
│   │   ├── my.jsx
│   │   └── register.jsx
│   ├── images                    // 图片资源
│   │   ├── goods-sel.png
│   │   ├── goods.png
│   │   ├── message-sel.png
│   │   ├── message.png
│   │   ├── order-sel.png
│   │   ├── order.png
│   │   ├── user-sel.png
│   │   └── user.png
│   ├── index.js                  // 项目 index 文件
│   ├── reducers                  // Reducer
│   │   ├── chat.js
│   │   ├── goods.js
│   │   ├── index.js
│   │   ├── orders.js
│   │   └── user.js
│   ├── registerServiceWorker.js
│   ├── router                    // 路由
│   │   └── router.jsx
│   ├── store
│   │   └── configureStore.js
│   └── styles
│       └── index.scss
```

## 视频

![课程大纲](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-034352.png)

从2018年1月开始，每周都会更新 2 小时左右的教学视频，视频会按照以上大纲教学，这个视频是完全免费的，保证更新完成。

视频会在该仓库和我的微信群中更新链接。

如果觉得我的项目和视频不错的话，可以请我喝瓶饮料。

[课程地址，你可以直接关注我](https://www.bilibili.com/video/av17908190/)

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-034354.jpg)
![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-034356.jpg)

## 群介绍

**群内禁止发任何的广告，违者直接踢出。**

本群交流内容不限于前端，对于后端和原生 APP 也可以交流。

群内我会每天发一篇前端的优秀文章，每周在双休日发一次总结。群内除了会更新该课程的内容以外，另有别的小教学视频赠送。目前想好的内容包括：前端必知的网络知识和如何写好一篇优秀的简历。

## 功能

- [√] 项目按路由模块加载
- [√] redux完整示范
- [√] 后端接口
- [√] 数据结构通过 immutable.js 实现
- [√] 登录注册，以及登录权限控制
- [√] 商品页面
- [√] 所有订单页面
- [√] 我的页面
- [√] 聊天功能
- [] TypeScript 替换 JS
- [] 后端实现 GraphQL
- [] 使用 RN 实现原生 APP

## ❗️ 勘误

如果在项目中发现了有什么不解或者发现了 bug，欢迎提交 PR 或者 issue，当然你也可以直接入群与我交流。

## ♥️ 感谢

如果喜欢这个项目，欢迎 Star！

## 🌏 LICENSE

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-034400.png)

基于 GPLv3 协议进行分发和使用，更多信息参见协议文件。
