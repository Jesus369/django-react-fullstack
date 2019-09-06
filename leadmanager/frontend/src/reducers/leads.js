import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types.js";

const initialState = {
  leads: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    // Using a case statement to test is if GET_LEADS is provded
    case GET_LEADS:
      return {
        // Returning a spread of the state and
        // Setting leads array to action.payload coming from ../actions/types
        ...state,
        leads: action.payload
      };
    case DELETE_LEAD:
      return {
        // Returning a spread of the state
        // Returning all other leads other than the deleted lead by
        // using the filter() and excluding the id
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload)
      };
    case ADD_LEAD:
      return {
        // Returning all current leads plus the new lead(action.payload)
        ...state,
        leads: [...state.leads, action.payload]
      };
    default:
      return state;
  }
}
