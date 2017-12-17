import React from "react";
import LoginForm from "../components/login/loginForm";
import AnimationContainer from './animation'

const Login = () => (
  <div>
    <LoginForm />
  </div>
);

export default AnimationContainer(Login);
