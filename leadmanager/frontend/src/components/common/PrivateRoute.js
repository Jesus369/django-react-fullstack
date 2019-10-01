import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// component: Component is the Component being passed into the parent
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      // ...rest = props; this is ejected so there are no errors
      // when props is referenced twice
      {...rest}
      render={props => {
        if (auth.isLoading) {
          return <h2>Loading...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
