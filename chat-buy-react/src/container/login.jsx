/* eslint-disable import/first */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import LoginForm from "../components/login/loginForm";
import { connect } from "react-redux";
import { login } from "../actions/user";
import * as React from "react";
let Login = class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            user: "",
            pwd: ""
        };
        this.handleTextChange = (key, value) => {
            this.setState({
                [key]: value
            });
        };
        this.handleLogin = () => {
            this.props.login(this.state);
        };
        this.handlePush = () => {
            this.props.history.push("register");
        };
    }
    componentWillMount() {
        setTimeout(() => {
            console.log('object');
            this.setState({
                user: 'value'
            });
            console.log(this.state);
        }, 5000);
    }
    componentDidMount() {
        setTimeout(() => {
            console.log('object1');
            this.setState({
                user: 'yck'
            });
            console.log(this.state);
        }, 5000);
    }
    render() {
        return (<div>
        <LoginForm push={this.handlePush} login={this.handleLogin} handleTextChange={this.handleTextChange}/>
      </div>);
    }
};
Login = __decorate([
    connect(null, { login })
], Login);
export default Login;
