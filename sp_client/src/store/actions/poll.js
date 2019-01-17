import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_POLL, VOTE_POLL, EMPTY_POLL } from "../actionTypes";

export const loadPollDispatch = (response) => ({
  type: LOAD_POLL,
  isNew: false,
  response
});

export const votePollDispatch = (vote) => ({
  type: VOTE_POLL,
  vote
});

export const emptyPollDispatch = () => ({
  type: EMPTY_POLL
});

export const createPoll = (jsonState) => {
  return dispatch => {
    return apiCall("POST", "/api/poll/createPoll", {jsonState})
     .then(res => dispatch(loadPollDispatch(res)))
     .catch(err => {
       dispatch(addError(err.message));
     });
  };
};

export const loadPoll = (id) => {
  return dispatch => {
    return apiCall("GET", `/api/poll/${id}`)
     .then(res => dispatch(loadPollDispatch(res)))
     .catch(err => {
       dispatch(addError(err.message));
     });
  };
};

export const votePoll = (id, options_id) => {
  return dispatch => {
    return apiCall("PUT", `/api/poll/${id}`, {options_id})
    .then(res => dispatch(votePollDispatch(res)))
    .catch(err => {
      dispatch(addError(err.message));
    });
  };
};

// CreateNewPollDispatch - Continues on down the pipeline; no need to re-load data
// loadPollDispatch - Assumes the user has jumped straight to the URL, load that data.
