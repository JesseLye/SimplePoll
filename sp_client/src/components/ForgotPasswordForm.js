import React, { Component } from "react";
import { apiCall } from "../services/api";

export default class ForgotPasswordForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      errors: "",
      showForm: true,
      buttonDisabled: false
    };
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({...this.state, buttonDisabled: true});
    const email = this.state.email;
    apiCall("POST", "/api/reset/forgotRequest", { email })
      .then(res => this.setState({...this.state, showForm: false, errors: ""}))
      .catch(err => {
        this.setState({...this.state, showForm: true, errors: err.message, buttonDisabled: false})
      });
  };

  render() {
    return (
      <div className="container">
        <div className="item">
          {this.state.errors && <h1>{this.state.errors}</h1>}
          {this.state.showForm ? (
            <form className="form form__create-poll" onSubmit={this.handleSubmit}>
              <h1 className="form__header">Forgot Passsword</h1>
              <input
                className="form__create-poll--title"
                id="create-poll-form-title-input"
                key="email"
                name="email"
                type="text"
                size={45}
                autoComplete="off"
                placeholder="example@email.com"
                onChange={this.handleChange} />
              <button className="btn btn__create-poll" disabled={this.state.buttonDisabled} type="submit">Submit</button>
            </form>
          ) : (
            <p>Request Sent!</p>
          )}
        </div>
      </div>
    );
  };
};
