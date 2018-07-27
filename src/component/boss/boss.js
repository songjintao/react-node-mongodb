import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux' 

@connect(
    state=> state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    constructor(props) {
        super(props)
        this.state= {
            data: []
        }
    }
    componentDidMount() {
        // axios.get('/useer/list?type=genius')
        // .then(res=> {
        //     if(res.data.code === 200) {
        //         this.setState({data: res.data.data})
        //     }
        // })
        // .catch(err=> {
        //     throw err
        // })
        this.props.getUserList('genius')
    }
    
    render() {
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.avatar?(<Card key={v._id}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={v.title}
                        >
                        </Card.Header>
                        <Card.Body>
                            {v.desc.split('\n').map(v=> (
                                <div key={v}>{v}</div>
                            ))}
                        </Card.Body>
                    </Card>) : null
                ))}
            </WingBlank>
        )
    }
}

export default Boss