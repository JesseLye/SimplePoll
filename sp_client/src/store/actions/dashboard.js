import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_DASHBOARD, REMOVE_POLL } from "../actionTypes";

export const loadDashboardDispatch = (response) => ({
  type: LOAD_DASHBOARD,
  response
});

export const removePollDispatch = (response) => ({
  type: REMOVE_POLL,
  response
});

export const loadDashboard = () => {
  return dispatch => {
    return apiCall("GET", "/api/user/dashboard")
     .then(res => dispatch(loadDashboardDispatch(res)))
     .catch(err => {
       dispatch(addError(err.message));
     });
  };
};

export const deletePoll = (id, user_id) => {
  return dispatch => {
    return apiCall("DELETE", `/api/poll/${id}/deleteRequest/${user_id}`)
      .then(res => dispatch(removePollDispatch(res)))
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};
