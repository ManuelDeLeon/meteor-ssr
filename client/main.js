import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter } from "react-router-dom";
import { onPageLoad } from "meteor/server-render";
import { routes, getRouteSubscriptions } from "/client_server/routes";
import { Tracker } from "meteor/tracker";
import ViewModel from "viewmodel-react";

// Use Meteor's dependency management
ViewModel.Tracker = Tracker;

const subscriptions = getRouteSubscriptions(window.location.pathname).map(subscription => {
  return new Promise((resolve, reject) => {
    Meteor.subscribe(subscription, {
      onReady: resolve,
      onError: reject
    });
  });
});

Promise.all(subscriptions).then(() => {
  onPageLoad(() => {
    const App = () => (
      <BrowserRouter>
        <Switch>{routes}</Switch>
      </BrowserRouter>
    );
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

Accounts.onResetPasswordLink((token, done) => {
  window.location.replace("/account/resetPwd?token=" + token);
  done();
});
