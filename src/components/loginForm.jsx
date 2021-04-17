import React, { Component } from "react";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      account: {
        username: "",
        password: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submiited");
  }
  handleChange(e) {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  }
  render() {
    const { account } = this.state;
    return (
      <div className="container">
        <h1>LoginForm</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={account.username}
              name="username"
              onChange={this.handleChange}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              id="password"
              name="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn-primary btn">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
