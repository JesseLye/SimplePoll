import { LOAD_DASHBOARD, REMOVE_POLL } from "../actionTypes";

export default (state = {}, action) => {
  switch(action.type) {
    case LOAD_DASHBOARD:
      return action.response;
      case REMOVE_POLL:
        const removePoll = {
          ...state,
          pollsCreated: state.pollsCreated.filter(function(d){return d._id !== action.response._id}),
          pollsVoted: state.pollsVoted.filter(function(d){return d._id !== action.response._id})
        };
        return removePoll;
    default:
      return state;
  };
};
