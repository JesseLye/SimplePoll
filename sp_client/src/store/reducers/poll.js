import { LOAD_POLL, VOTE_POLL, EMPTY_POLL } from "../actionTypes";

export default (state = {}, action) => {
  switch(action.type) {
    case LOAD_POLL:
      const loadState = {
        title: action.response.title,
        options: [...action.response.options],
        _id: action.response._id,
        pollAuthor: action.response.pollAuthor,
        isNew: action.isNew
      };
      return loadState;
    case VOTE_POLL:
      const addState = {
        ...state,
        options: [...action.vote.options]
      };
      return addState;
    case EMPTY_POLL:
      return state;
    default:
      return state;
  };
};
