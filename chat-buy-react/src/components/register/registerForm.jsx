import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {connect} from 'react-redux'
import {regiser} from '../../actions/user'

@connect(
  state => state.user,
  {regiser}
)
class RegisterForm extends React.Component {
  constructor() {
    super()
    this.handleTextChange = this.handleTextChange.bind(this)
    this.state = {
      user: '',
      pwd: '',
      type: 'deliver'
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
          onChange={(event, v) => this.handleTextChange('phone', v)}
        />
        <TextField
          hintText="密码"
          floatingLabelText="密码"
          fullWidth={true}
          style={{marginBottom: '20px'}}
          type='password'
          onChange={(event, v) => this.handleTextChange('pwd', v)}
        />
        <RadioButtonGroup 
          name="shipSpeed" 
          defaultSelected="deliver"
          onChange={(event, v) => this.handleTextChange('type', v)}
        >
          <RadioButton
            value="deliver"
            label="送货员"
          />
          <RadioButton
            value="customer"
            label="顾客"
            style={{marginTop: '10px'}}
          />
        </RadioButtonGroup>
        <RaisedButton
          label="注册"
          primary={true}
          fullWidth={true}
          style={{marginTop: '20px'}}
          onClick={() => this.props.regiser(this.state)}
        />
      </div>
    )
  }
}

export default RegisterForm