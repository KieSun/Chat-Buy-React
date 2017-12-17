import React from "react";
import RegisterForm from "../components/register/registerForm";
import AnimationContainer from './animation'

const Register = () => (
  <div>
    <RegisterForm />
  </div>
);

export default AnimationContainer(Register);
