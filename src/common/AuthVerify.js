import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const AuthVerify = (props) => {
  props.history.listen(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });
  return <div></div>;
};
export default withRouter(AuthVerify);

//Because we use BrowserRouter, we import withRouter and wrap the component with a HoC.
//Now props can access the history object’s properties and functions.
// Then we pass a callback to props.history.listen() for listening every Route changes.
