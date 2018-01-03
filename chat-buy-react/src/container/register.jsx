import React from "react";
import RegisterForm from "../components/register/registerForm";
import { connect } from "react-redux";
import { register } from "../actions/user";

@connect(null, { register })
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      pwd: "",
      type: "deliver"
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.radioData = [
      { type: "deliver", text: "送货员" },
      { type: "customer", text: "顾客" }
    ];
  }
  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  handleRegister() {
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
