import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import InputWrapper from '../../styles/form/form'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.handleTextChange = this.handleTextChange.bind(this)
    this.state = {
      phone: '',
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
          hintText="手机号"
          floatingLabelText="手机号"
          fullWidth={true}
          onChange={(event, v) => this.handleTextChange('phone', v)}
        />
        <TextField
          hintText="密码"
          floatingLabelText="密码"
          fullWidth={true}
          onChange={(event, v) => this.handleTextChange('phone', v)}
        />
        <RaisedButton
          label="登录"
          primary={true}
          fullWidth={true}
          style={{marginTop: '20px'}}
          onClick={() => {}}
        />
        <InputWrapper>
          <FlatButton
                  label="注册"
                  style={{width: '100px'}}
          />
          <FlatButton
            label="忘记密码"
            style={{width: '100px'}}
            secondary={true}
          />
        </InputWrapper>
      </div>
    )
  }
}

export default LoginForm