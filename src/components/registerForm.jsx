import React from "react";

import Joi from "joi-browser";

import Form from "./common/form";

class RegisterForm extends Form {
  constructor() {
    super();
    this.schema = {
      username: Joi.string().email().required().label("Username"),
      password: Joi.string().required().min(5).label("Password"),
      name: Joi.string().required().label("Name"),
    };
    this.state = {
      data: {
        username: "",
        password: "",
        name: "",
      },
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.validateProperty = this.validateProperty.bind(this);
  }

  handleChange({ currentTarget: input }) {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    console.log(errorMessage);
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  }
  doSubmit() {
    console.log("Submitted");
  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
