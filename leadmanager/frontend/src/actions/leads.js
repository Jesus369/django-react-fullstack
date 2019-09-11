import axios from "axios";
import { createMessage } from "./messages";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from "./types";

// GET_LEADS
export const getLeads = () => dispatch => {
  axios
    .get("api/leads/")
    .then(res => {
      dispatch({
        // For type GET_LEADS payload will return the fetched leads
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE_LEAD
export const deleteLead = id => dispatch => {
  axios
    .delete(`api/leads/${id}/`)
    .then(res => {
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
export const addLead = lead => dispatch => {
  axios
    .post("api/leads/", lead)
    .then(res => {
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
