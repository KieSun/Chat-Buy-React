import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {ButtonWrapper} from '../../styles/form/form'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../actions/user'

@withRouter
@connect(
  state => state.user,
  {login}
)
class LoginForm extends React.Component {
  constructor() {
    super()
    this.handleTextChange = this.handleTextChange.bind(this)
    this.state = {
      user: '',
      pwd: ''
    }
  }
  handleTextChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  render() {
    return (
      <div style={{marginTop: '100px'}}>
        <WingBlank>
          <List>
              <InputItem
                onChange={v=>this.handleTextChange('user',v)}
              >用户名</InputItem>
              <WhiteSpace />
              <InputItem
                onChange={v=>this.handleTextChange('pwd',v)}
              >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button 
            type="primary"
            onClick={() => this.props.login(this.state)}
          >登录</Button>
          <WhiteSpace />
          <ButtonWrapper>
            <Button 
              inline 
              size="small" 
              style={{ width: '100px' }}
              onClick={() => this.props.history.push('/register')}
            >注册</Button>
            <Button 
              inline 
              size="small" 
              style={{ width: '100px' }}
            >忘记密码</Button>
          </ButtonWrapper>
        </WingBlank>
      </div>
    )
  }
}

export default LoginForm