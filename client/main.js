import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { onPageLoad } from "meteor/server-render";
import routes from "../client_server/routes";
import { Tracker } from "meteor/tracker";
import ViewModel from "viewmodel-react";

// Use Meteor's dependency management
ViewModel.Tracker = Tracker;

const App = () => (
  <BrowserRouter>
    <Switch>{routes}</Switch>
  </BrowserRouter>
);

Meteor.subscribe("main", () => {
  onPageLoad(() => {
    ReactDOM.hydrate(<App />, document.getElementById("app"));
  });
});

Accounts.onEmailVerificationLink(function(token, done) {
  Accounts.verifyEmail(token, function(error) {
    if (error) {
      // handle the error, perhaps by showing the user a message about an invalid token
      console.log(error);
    } else {
      // Tell the user their email has been validated
    }
    done();
  });
});
