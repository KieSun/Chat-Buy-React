<p align="center">
<img src="https://img.shields.io/badge/Language-%20JavaScript%20-f9e229.svg">
<a href="https://github.com/halfrost/vue-objccn/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-GPL-blue.svg"></a>
</p>


Use React / Node to achieve the application. Project is small but complete, suitable for novice learning.

## Technology stack and main framework

📦 React family：react + redux + react-router 4.0 + immutable.js  
📌 ES6 + ES7     
📡 fetch：axios + socket.io
🎈 UI Framework：antd mobile  
✏️ Back-end：express + mongoDB

## Run Project
``` bash
# clone 
git clone https://github.com/KieSun/Chat-Buy-React.git
cd chat-buy-react

# Mac install MongoDb
brew install mongodb

# run MongoDb
mongod --config /usr/local/etc/mongod.conf

# connect mongo
mongo

# install npm package
npm install
npm i nodemon -g

# run server (Mac)
npm run server

# run server (Windows)
npm run dev

# run localhost
npm run start
```

## Screenshot

I will internationalized text.

![登录](https://user-gold-cdn.xitu.io/2017/12/31/160ab0250a8841d5?w=378&h=667&f=gif&s=32928)
![商品购买](https://user-gold-cdn.xitu.io/2017/12/31/160ab0246b51bfef?w=378&h=667&f=gif&s=31759)
![订单](https://user-gold-cdn.xitu.io/2017/12/31/160ab02588408b53?w=378&h=667&f=gif&s=207506)
![聊天](https://user-gold-cdn.xitu.io/2017/12/31/160ab023c8e6a9d7?w=378&h=667&f=gif&s=67204)

## File structure

```
── server                         
│   ├── chat.js                   
│   ├── foods.json                
│   ├── goods.js                  
│   ├── jwtMiddleware.js          
│   ├── key.js                    
│   ├── model.js                  
│   ├── order.js                  
│   ├── server.js                 
│   ├── socket.js                 
│   └── user.js                   
├── src
│   ├── actions                   
│   │   ├── chat.js
│   │   ├── goods.js
│   │   ├── order.js
│   │   ├── type.js
│   │   └── user.js
│   ├── asyncComponent.jsx        
│   ├── common
│   │   ├── axiosMiddleware.js    
│   │   ├── history.js            
│   │   └── unit.js               
│   ├── components
│   │   ├── allOrders             
│   │   │   └── list.jsx
│   │   ├── common
│   │   │   └── 404.jsx
│   │   ├── goods
│   │   │   ├── buy.jsx           
│   │   │   └── goodsList.jsx     
│   │   ├── login
│   │   │   └── loginForm.jsx     
│   │   ├── message
│   │   │   ├── chatList.jsx      
│   │   │   ├── chatListItem.jsx  
│   │   │   └── messageList.jsx   
│   │   ├── myOrder
│   │   │   ├── myOrder.jsx       
│   │   │   └── myOrderItem.jsx   
│   │   ├── navBar
│   │   │   └── backNavBar.jsx    
│   │   └── register
│   │       └── registerForm.jsx  
│   ├── container                 
│   │   ├── allOrders.jsx
│   │   ├── chat.jsx
│   │   ├── dashboard.jsx
│   │   ├── goods.jsx
│   │   ├── login.jsx
│   │   ├── message.jsx
│   │   ├── my.jsx
│   │   └── register.jsx
│   ├── images                    
│   │   ├── goods-sel.png
│   │   ├── goods.png
│   │   ├── message-sel.png
│   │   ├── message.png
│   │   ├── order-sel.png
│   │   ├── order.png
│   │   ├── user-sel.png
│   │   └── user.png
│   ├── index.js                  
│   ├── reducers                  
│   │   ├── chat.js
│   │   ├── goods.js
│   │   ├── index.js
│   │   ├── orders.js
│   │   └── user.js
│   ├── registerServiceWorker.js
│   ├── router                    
│   │   └── router.jsx
│   ├── store
│   │   └── configureStore.js
│   └── styles
│       └── index.scss
```

## Features

- [√] Route Separate
- [√] Redux
- [√] Back-end interface
- [√] Using Immutable.js
- [√] Login, register and authentication
- [√] Goods UI
- [√] All order UI
- [√] Mine UI
- [√] Chat Features
- [] Use TypeScript
- [] GraphQL
- [] Reative-native

Feedback, issues, etc. are more than welcome!
