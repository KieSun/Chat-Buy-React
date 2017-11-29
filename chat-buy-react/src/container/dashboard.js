import React from 'react'
import { TabBar } from 'antd-mobile';
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {DashBoardWrapper} from '../styles/dashboard/dashboard'

function Deliver() {
    return (
        <div>deliver</div>
    )
}
function Goods() {
    return (
        <div>Goods</div>
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
        type: 'deliver',
        component: Deliver
    },
    {
        title: '商品',
        path: '/goods',
        type: 'customer',
        component: Goods
    },
    {
        title: '消息',
        path: '/message',
        component: Message
    },
    {
        title: '我的',
        path: '/me',
        component: Me
    }
]

@connect(
    state => state.user
)
class DashBoard extends React.Component {
    componentWillMount() {
        if (!this.props.type) {
            console.log(this);
        }
    }
    render() {
        const {user, location, history} = this.props
        return (
            <div>
                <Switch>
                    {list.map(v => (
                        <Route key={v.path} path={v.path} component={Me}/>
                    ))}
                </Switch>
                <DashBoardWrapper>
                    <TabBar>
                        {list
                            .filter(v => v.type !== user)
                            .map(v => (
                            <TabBar.Item
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                                />}
                                // selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                                title={v.title}
                                key={v.title}
                                selected={location === v.path}
                                onPress={() => {
                                    history.push(v.path)
                                }}
                            />
                        ))}
                    </TabBar>
                </DashBoardWrapper>
            </div>
        )
    }
}

export default DashBoard