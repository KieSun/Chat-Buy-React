import React from 'react'
import RegisterForm from '../components/register/registerForm'
// import userIsAuthenticated from '../requireAuth.js'

class Register extends React.Component {
  render() {
    return (
      <div>
        <RegisterForm />
      </div>
    )
  }
}

export default Register