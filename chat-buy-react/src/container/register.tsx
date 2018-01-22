/* eslint-disable import/first */
import React from "react";
import RegisterForm from "../components/register/registerForm";
import { connect } from "react-redux";
import { register, User } from "../actions/user";

interface Action {
  register: (state: User) => void
}

export interface RadioType {
  type: string
  text: string
}

@(connect(null, { register }) as any)
class Register extends React.Component<Action> {
  state: User = {
    user: "",
    pwd: "",
    type: "deliver"
  };
  radioData:Array<RadioType> = [
    { type: "deliver", text: "送货员" },
    { type: "customer", text: "顾客" }
  ];
  handleTextChange = (key: keyof User, value: string) => {
    this.setState({
      [key]: value
    });
  }
  handleRegister = () => {
    this.props.register(this.state);
  }
  render() {
    return (
      <div>
        <RegisterForm
          register={this.handleRegister}
          radioData={this.radioData}
          handleTextChange={this.handleTextChange}
          type={this.state.type}
        />
      </div>
    );
  }
}

export default Register;
