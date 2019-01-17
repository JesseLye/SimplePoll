import React, { Component } from "react";
import { connect } from "react-redux";
import { removeError } from "../store/actions/errors";
import { loadPoll, emptyPollDispatch } from "../store/actions/poll";
import D3PieChart from "../components/D3PieChart";

class DisplayPollResults extends Component {
  constructor(props){
    super(props);
    this.state = {
      poll_ID: this.props.location.pathname.replace("/poll/", "").replace("/results", ""),
      colourArray: ["#8DD3C7", "#FFFFB3", "#BEBADA", "#FB8072", "#80B1D3",
                    "#FDB462", "#B3DE69", "#FCCDE5", "#D9D9D9", "#BC80BD"]
    };
  };

  componentDidMount(){
    this.props.loadPoll(this.state.poll_ID);
  };

  render() {
    const { poll } = this.props;

    let mapResults = "No options?";
    let pollCondition = Object.keys(poll).length !== 0;
    let data = [];
    let totalVotes = 0;

    let title = !!this.props.poll.title ? this.props.poll.title : "Loading";
    let username = !!this.props.poll.pollAuthor ? this.props.poll.pollAuthor.username : "Anonymous";

    if(pollCondition){
      if(this.props.poll.options.length > 0){
        mapResults = this.props.poll.options.map((d, i) => (
          <div className="u-display-inline-block" key={`options-${d.text}`}>
            <div className="item__results--block" style={{backgroundColor: this.state.colourArray[i], width: "10px", height: "10px", position: "absolute", marginLeft: "-15px", marginTop: "3px"}}></div>
            <p className="item__results--text">{`${d.text} - ${d.count} votes`}</p>
          </div>
        ));

        this.props.poll.options.forEach(d => totalVotes += d.count);
        data = this.props.poll.options.map(d => ({voteFor: d.text, voteCount: d.count}));

      };
    };

    return (
      <div className="container">
        <div className="item u-padding-bottom-medium">
          <h1 className="form__header">{`${title} Results`}</h1>
          <h2 className="form__sub-header">{`Created By: ${username}`}</h2>
          <div className="item__container">
            <div className="u-display-text-align-center garbage">
              <D3PieChart chartData={data} />
            </div>
            {mapResults}
            <div className="u-display-inline-block">
              <p>{`Total Votes: ${totalVotes}`}</p>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

function mapStateToProps(state) {
  return {
    poll: state.poll,
    errors: state.errors
  };
};


export default connect(mapStateToProps, { loadPoll, emptyPollDispatch, removeError })(DisplayPollResults);
