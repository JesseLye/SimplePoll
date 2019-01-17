import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeError } from "../store/actions/errors";
import { loadDashboard } from "../store/actions/dashboard";
import { deletePoll } from "../store/actions/dashboard";

class DisplayProfileInfo extends Component {
  constructor(props){
    super(props);
  };

  componentDidMount(){
    this.props.loadDashboard();
  }

  render() {
    const { dashboard, currentUser } = this.props;

    let pollsCreated = "Nothing here!";
    let pollsVoted = "Nothing here!";
    let dashboardCondition = Object.keys(dashboard).length !== 0;

    if(dashboardCondition){
      if(dashboard.pollsCreated.length > 0){
        pollsCreated = dashboard.pollsCreated.map(d => (
          <div className="item__list">
            <div className="item__float-left">
              <Link className="item__list--item" to={`/poll/${d._id}`}>
                {d.title}
              </Link>
            </div>
            <div className="item__float-right">
              <button className="btn btn__delete-poll" onClick={this.props.deletePoll.bind(this, d._id, currentUser.user.id)}>Delete</button>
            </div>
          </div>
        ));
      };

      if(dashboard.pollsVoted.length > 0){
        pollsVoted = dashboard.pollsVoted.map(d => (
          <div className="item__list">
            <div className="item__float-left">
              <Link className="item__list--item" to={`/poll/${d._id}`}>
                {d.title}
              </Link>
            </div>
          </div>
        ));
      };
    };

    return (
      <div className="container">
        <div className="row row--gutters">
          <div className="row__medium-6">
            <div className="item item__vote-list">
              <p className="item__header">Polls Created</p>
              {pollsCreated}
            </div>
          </div>
          <div className="row__medium-6">
            <div className="item item__vote-list">
              <p className="item__header">Polls Voted</p>
              {pollsVoted}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    dashboard: state.dashboard,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { loadDashboard, deletePoll, removeError })(DisplayProfileInfo);
