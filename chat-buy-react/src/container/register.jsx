var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable import/first */
import React from "react";
import RegisterForm from "../components/register/registerForm";
import { connect } from "react-redux";
import { register } from "../actions/user";
let Register = class Register extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            user: "",
            pwd: "",
            type: "deliver"
        };
        this.radioData = [
            { type: "deliver", text: "送货员" },
            { type: "customer", text: "顾客" }
        ];
        this.handleTextChange = (key, value) => {
            this.setState({
                [key]: value
            });
        };
        this.handleRegister = () => {
            this.props.register(this.state);
        };
    }
    render() {
        return (<div>
        <RegisterForm register={this.handleRegister} radioData={this.radioData} handleTextChange={this.handleTextChange} type={this.state.type}/>
      </div>);
    }
};
Register = __decorate([
    connect(null, { register })
], Register);
export default Register;
