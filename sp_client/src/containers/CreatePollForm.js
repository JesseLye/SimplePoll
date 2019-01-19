import React, { Component } from "react";
import { connect } from "react-redux";
import { createPoll, emptyPollDispatch } from "../store/actions/poll";
import { removeError } from "../store/actions/errors";

class CreatePollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      options: [""],
      errors: "",
      formEnabled: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNewOption = this.handleNewOption.bind(this);
    this.handleChangeOpt = this.handleChangeOpt.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptRemove = this.handleOptRemove.bind(this);
    this.handleError = this.handleError.bind(this);
  };

  componentDidMount(){
    this.props.emptyPollDispatch();
    this.props.removeError();
  }

  shouldComponentUpdate(nextProps, nextState){
    if(Object.keys(nextProps.poll).length > 0){
      this.props.history.push(`/poll/${nextProps.poll._id}`);
    };

    if(nextProps.errors.message) {
      this.handleError(nextProps.errors.message);
    };

    return true;
  };

  handleError(err) {
    this.props.removeError();
    this.setState({...this.state, errors: err, formEnabled: true});
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  };

  handleNewOption() {
    const { options } = this.state;
    this.setState({options: [...options, ""]});
  };

  handleChangeOpt(e) {
    if(this.state.formEnabled){
      const index = Number(e.target.name.split('-')[1]);
      let options = this.state.options.map((opt, i) => (
        i === index ? e.target.value : opt
      ));
      if(index === options.length - 1 && options.length - 1 < 9){
        options.push("");
      };
      this.setState({options});
    } else {
      return; 
    }
  };

  handleOptRemove(select) {
    if(this.state.options.length !== 1){
      const options = this.state.options.filter((opt, i) => (
        i !== select
      ));
      this.setState({options});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const jsonState = JSON.stringify(this.state);
    this.props.createPoll(jsonState);
    this.setState({
      formEnabled: false
    });
  };

  render(){
    const { title, options } = this.state;
    const { errors } = this.props;

    let inputs = options.map((opt, i) => (
      <div key={`option-${i}`}>
        {/* <label className="form__create-poll--label">{`${i+1}.`} */}
        {i !== 0 &&
          <button type="button"
                  className="btn btn__remove-option"
                  onClick={this.handleOptRemove.bind(this, i)}>
                  X
          </button>
        }
        <input
          className="form__create-poll--option"
          type="text"
          name={`option-${i}`}
          value={opt}
          // size={45}
          autoComplete="off"
          placeholder={`Note #${i + 1}`}
          onChange={this.handleChangeOpt} />
        {/* </label> */}
      </div>
    ));

    return (
      <div className="container">
        <div className="item">
          {this.state.errors && 
            <div className="form__error">
              <h1 className="form__error--header">{this.state.errors}</h1>
            </div>
          }
          <form className="form form__create-poll" onSubmit={this.handleSubmit}>
              <h1 className="form__header">New Poll</h1>
              <fieldset disabled={!this.state.formEnabled} style={{padding: "0", border: "none"}}>
                {/* <div className="create-poll__header"> */}
                  <input
                    className="form__create-poll--title"
                    id="create-poll-form-title-input"
                    key="title"
                    name="title"
                    type="text"
                    value={title}
                    // size={45}
                    autoComplete="off"
                    placeholder="title"
                    onChange={this.handleChange} />
                {/* </div> */}
                {inputs}
                <button className="btn btn__create-poll" type="submit">{this.state.formEnabled ? "Create Poll" : "Please Wait..."}</button>
              </fieldset>
          </form>
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

export default connect(mapStateToProps, { createPoll, emptyPollDispatch, removeError })(CreatePollForm);
