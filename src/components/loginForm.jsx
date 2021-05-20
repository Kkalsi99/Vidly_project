import React from "react";

import Joi from "joi-browser";

import Form from "./common/form";

class LoginForm extends Form {
  constructor() {
    super();
    this.schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };
    this.state = {
      data: {
        username: "",
        password: "",
      },
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.validateProperty = this.validateProperty.bind(this);
  }

  doSubmit() {
    console.log("Submitted");
  }
  render() {
    return (
      <div className="container">
        <h1>LoginForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
