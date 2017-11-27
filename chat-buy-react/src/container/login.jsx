import React from 'react'
import LoginForm from '../components/login/loginForm'
// import userIsAuthenticated from '../requireAuth.js'

class Login extends React.Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
}

export default Login