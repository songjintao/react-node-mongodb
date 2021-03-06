import React from 'react'
import { connect } from 'react-redux'
import { NavBar} from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLink from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import {getMsgList, recvMsg} from '../../redux/chat.redux'

// function Boss () {
//     return <h2>牛人列表</h2>
// }
// function Genius () {
//     return <h2>Boss列表</h2>
// }
function Msg () {
    return <h2>Msg页面</h2>
}
// function User () {
//     return <h2>个人中心页面</h2>
// }

@connect(
    state=> state,
    {getMsgList, recvMsg}
)
class Dashboard extends React.Component {

    componentDidMount() {
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const user = this.props.user
        const { pathname } = this.props.location
        
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'boss列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        return (
            <div>
                <NavBar className='fixd-header' mode='dark'>
                    {navList.find(v=> v.path === pathname).title}
                </NavBar>
                {/* <div style={{marginTop:45}}> */}
                <div>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLink data={navList}></NavLink>
            </div>
        )
    }
}

export default Dashboard