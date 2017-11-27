import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ButtonWrapper from '../../styles/form/form'
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
      <div>
        <TextField
          hintText="用户名"
          floatingLabelText="用户名"
          fullWidth={true}
          onChange={(event, v) => this.handleTextChange('user', v)}
        />
        <TextField
          hintText="密码"
          floatingLabelText="密码"
          fullWidth={true}
          type='password'
          onChange={(event, v) => this.handleTextChange('pwd', v)}
        />
        <RaisedButton
          label="登录"
          primary={true}
          fullWidth={true}
          style={{marginTop: '20px'}}
          onClick={() => this.props.login(this.state)}
        />
        <ButtonWrapper>
          <FlatButton
            label="注册"
            style={{width: '100px'}}
            onClick={() => console.log(this.props.history.push('/register'))}
          />
          <FlatButton
            label="忘记密码"
            style={{width: '100px'}}
            secondary={true}
          />
        </ButtonWrapper>
      </div>
    )
  }
}

export default LoginForm