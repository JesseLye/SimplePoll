import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeError } from "../store/actions/errors";
import { loadPoll, votePoll } from "../store/actions/poll";

class DisplayPollVote extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: "",
      poll_ID: this.props.location.pathname.replace("/poll/", ""),
      formEnabled: true,
      errors: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  };

  componentDidMount(){
    this.props.loadPoll(this.state.poll_ID);
    this.props.removeError();
  };

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.errors.message) {
      this.handleError(nextProps.errors.message);
    };

    if(nextProps.poll.proceed) {
      this.props.history.push(`/poll/${this.state.poll_ID}/results`);
    };

    return true;
  }

  handleError(err) {
    this.props.removeError();
    this.setState({...this.state, errors: err, formEnabled: true});
  }

  handleChange(e) {
    this.setState({...this.state, selectedOption: e.target.value});
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.votePoll(this.state.poll_ID, this.state.selectedOption);
    this.setState({
      formEnabled: false
    });
  };

  render() {
    const { poll } = this.props;

    let mapOptions = "No options?";
    let pollCondition = Object.keys(poll).length !== 0;

    if(pollCondition){
      if(this.props.poll.options.length > 0){
        mapOptions = this.props.poll.options.map((d, i) => (
          <div key={`options-${d.text}`}>
            <label className="form__vote-poll--container">
              {`${d.text}`}
              <input
                type="radio"
                name={d.text}
                value={d._id}
                checked={this.state.selectedOption === d._id}
                onChange={this.handleChange}
              />
              <span className="form__vote-poll--checkmark"></span>
            </label>
          </div>
        ));
      };
    };

    return (
      <div className="container">
        <div className="item">
          {this.state.errors &&
            <div className="form__error">
              <h1 className="form__error--header">{this.state.errors}</h1>
            </div>
            }
          <h1 className="form__header" style={{paddingTop: "2rem", paddingBottom: "0.3rem", marginTop: "0"}}>{this.props.poll.title}</h1>
          {/* <h2 className="form__sub-header">{this.props.pollAuthor}</h2> */}
          <div className="item__container">
            <form className="form form__vote-poll" onSubmit={this.handleSubmit}>
              <fieldset disabled={!this.state.formEnabled} style={{padding: "0", border: "none"}}>
                <p className="form__vote-poll">Choose one answer:</p>
                {mapOptions}
                <div className="u-display-inline-block">
                  <button className="btn btn__create-poll" type="submit">{this.state.formEnabled ? "Create Poll" : "Please Wait..."}</button>
                  <Link to={`/poll/${this.state.poll_ID}/results`} className="btn btn__show-results">
                    View Results
                  </Link>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    poll: state.poll,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { loadPoll, votePoll, removeError })(DisplayPollVote);
