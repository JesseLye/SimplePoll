import React from "react";
import CreatePollForm from "./CreatePollForm";
import DisplayProfileInfo from "./DisplayProfileInfo";
import DisplayPollVote from "./DisplayPollVote";
import DisplayPollResults from "./DisplayPollResults";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
import RouteNotFound from "../components/RouteNotFound";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import WithAuth from "../hocs/withAuth";

const Main = props => {
  const { currentUser } = props;
  return (
    <main>
      <Switch>
        <Route exact path="/" render={props => <CreatePollForm {...props} />} />
        <Route exact path="/reset/forgotPassword" render={props => <ForgotPasswordForm {...props} /> } />
        <Route exact path="/reset/:token" render={props => <ResetPasswordForm {...props} /> } />
        <Route exact path="/dashboard" render={props => <WithAuth RenderComponent={DisplayProfileInfo} currentUser={currentUser} {...props} /> } />
        <Route exact path="/poll/:id" render={props => <DisplayPollVote {...props} />} />
        <Route exact path="/poll/:id/results" render={props => <DisplayPollResults {...props} /> } />
        <Route render={() => <RouteNotFound />} />
      </Switch>
    </main>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps)(Main))
