import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'

// 读取信息
const MSG_RECV = 'MSG_RECV'

// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read&&action.payload.userid).length }
        case MSG_RECV:
            const n = action.payload.to === action.userid?1:0
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n }
        case MSG_READ:
            return {}
        default:
            return state
    }
}

function msgList(msgs, users, userid) {
    return { type: MSG_LIST, payload: {msgs, users, userid} }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    const userid = getState().user._id
                    dispatch(msgList(res.data.data, res.data.users, userid))
                }
            })
            .catch(err => {
                throw err
            })
    }
}

export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}

function msgRecv(msg, userid) {
    return { type: MSG_RECV, payload: msg, userid: userid }
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', (data) => {
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}