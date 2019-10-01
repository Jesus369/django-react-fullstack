import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

import { tokenConfig } from "./auth";

// GET_LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("api/leads/", tokenConfig(getState))
    .then(res => {
      dispatch({
        // For type GET_LEADS payload will return the fetched leads
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// DELETE_LEAD
export const deleteLead = id => (dispatch, getState) => {
  axios
    .delete(`api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      // Success alert for a deleted lead
      dispatch(createMessage({ deleteLead: "Lead Deleted!" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// ADD_LEAD
export const addLead = lead => (dispatch, getState) => {
  axios
    .post("api/leads/", lead, tokenConfig(getState))
    .then(res => {
      // Success alert for an added lead
      dispatch(createMessage({ addLead: "Lead Added!" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    // err.response.data returns msg from the frontend server
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
