import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import AuthForm from "../components/AuthForm";

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      signInForm: false,
      signUpForm: false,
      displayValue: false
    };

    this.logout = this.logout.bind(this);
    this.resetState = this.resetState.bind(this);
    this.iconClick = this.iconClick.bind(this);
  }

  resetState() {
    this.setState({...this.state, signInForm: false, signUpForm: false});
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  iconClick() {
    this.setState((prevState, props) => {
      return {...this.state, displayValue: !prevState.displayValue}
    });
  };

  render() {
    const { authUser, navbarErrors, removeError } = this.props;

    return (
      <div>
        {this.state.signInForm && (
          <AuthForm removeError={removeError}
                    errors={navbarErrors}
                    onAuth={authUser}
                    buttonText="Log In"
                    heading="Welcome Back"
                    resetFunc={this.resetState}
                    onClose={() => this.setState({...this.state, signInForm: false, signUpForm: false})}
                    {...this.props}
          />
        )}

        {this.state.signUpForm && (
          <AuthForm removeError={removeError}
                    errors={navbarErrors} onAuth={authUser}
                    signUp
                    buttonText="Sign me up!"
                    heading="Join StrangerDanger"
                    resetFunc={this.resetState}
                    {...this.props}
          />
        )}
        <nav className="navbar">
          <div className="container">
            {/* <Link to="/" className="navbar--float-left navbar-header">
              SimplePoll
            </Link> */}
            {/* Clumsy band-aide solution for a hard-to-find bug */}
            <a href="/" className="navbar--float-left navbar-header">SimplePoll</a>
            <div className={this.state.displayValue ? "navbar__menu-icon navbar__menu-icon--close-x" : "navbar__menu-icon"} onClick={this.iconClick}>
              <div className={this.state.displayValue ? "navbar__menu-icon--middle-hide" : "navbar__menu-icon--middle"}></div>
            </div>
            <div className="form__container">
              {this.props.currentUser.isAuthenticated ? (
                <div className={this.state.displayValue ? "u-display-inline-block navbar--float-right navbar__display--visible" : "u-display-inline-block navbar--float-right navbar__display"}>
                  {/* <Link to="/" className="navbar__link navbar__link--margin-left">
                    Home
                  </Link> */}
                  <a href="/" className="navbar__link navbar__link--margin-left">Home</a>
                  {/* Clumsy band-aide solution for a hard-to-find bug */}
                  <Link to="/dashboard" className="navbar__link navbar__link--margin-left">
                    Profile
                  </Link>
                  <p className="navbar__link navbar__link--margin-left" onClick={this.logout}>Logout</p>
                </div>
              ) : (
                <div className={this.state.displayValue ? "u-display-inline-block navbar--float-right navbar__display--visible" : "u-display-inline-block navbar--float-right navbar__display"}>
                  <p className="navbar__link navbar__link--margin-left" onClick={() => this.setState({signInForm: true, signUpForm: false})}>Log in</p>
                  <p className="navbar__link navbar__link--margin-left" onClick={() => this.setState({signInForm: false, signUpForm: true})}>Sign up</p>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    navbarErrors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser, logout, removeError })(Navbar));
