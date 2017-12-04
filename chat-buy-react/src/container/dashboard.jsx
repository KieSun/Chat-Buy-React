import React from 'react'
import { TabBar, NavBar } from 'antd-mobile';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getInfo} from '../actions/user'

import asyncComponent from '../asyncComponent'

const Goods = asyncComponent(() => import('./goods.jsx'))
function Deliver() {
    return (
        <div>deliver</div>
    )
}
function Message() {
    return (
        <div>Message</div>
    )
}
function Me() {
    return (
        <div>Me</div>
    )
}

const list = [
    {
        title: '订单',
        path: '/order',
        type: 'customer',
        component: Deliver,
        imgName: 'order'
    },
    {
        title: '商品',
        path: '/goods',
        type: 'deliver',
        component: Goods,
        imgName: 'goods'
    },
    {
        title: '消息',
        path: '/message',
        component: Message,
        imgName: 'message'
    },
    {
        title: '我的',
        path: '/me',
        component: Me,
        imgName: 'user'
    }
]

@connect(
    state => state.user,
    {getInfo}
)
class DashBoard extends React.Component {
    componentDidMount() {
        const {history, type} = this.props
        if (window.localStorage.getItem('token')) {
            if (!type) {
                this.props.getInfo()
            }
        } else {
            history.push('/login')
        }
    }
    render() {
        const {type, location, history, path} = this.props
        
        if (!type) {
            return null
        } else if (path && location.pathname === '/') {
            return <Redirect to={path} />
        }
        return  (
            <div>
                <NavBar className='nav'>
                    {list.find(v => v.path === location.pathname).title}
                </NavBar>
                <Switch>
                    {list.map(v => (
                        <Route key={v.path} path={v.path} component={v.component}/>
                    ))}
                </Switch>
                <div className='dashBoard-wrapper'>
                    <TabBar>
                        {list
                            .filter(v => v.type !== type)
                            .map(v => (
                            <TabBar.Item
                                icon={{ uri: require(`../images/${v.imgName}.png`) }}
                                selectedIcon={{ uri: require(`../images/${v.imgName}-sel.png`) }}
                                title={v.title}
                                key={v.title}
                                selected={location.pathname === v.path}
                                onPress={() => {
                                    history.push(v.path)
                                }}
                            />
                        ))}
                    </TabBar>
                </div>
            </div>
        )
    }
}

export default DashBoard