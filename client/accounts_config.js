import { Accounts } from "meteor/std:accounts-ui";
import { Meteor } from "meteor/meteor";
import { Cookies } from "meteor/ostrio:cookies";

Accounts.ui.config({
  passwordSignupFields: "EMAIL_ONLY_NO_PASSWORD",
  loginPath: "/",
  onPostSignUpHook: () => {
    Meteor.call("userLoggedIn", (error, clientId) => {
      if (error) {
        console.log(error);
      } else {
        const cookies = new Cookies({ TTL: Number.MAX_VALUE });
        cookies.set("clientId", clientId);
      }
    });
  },
  onSignedInHook: () => {
    window.location.search = "?token=" + Accounts._verifyEmailToken;
    const cookies = new Cookies({ TTL: Number.MAX_VALUE });
    const clientId = cookies.get("clientId");
    Meteor.call("userLoggedIn", clientId, (error, clientId) => {
      if (error) {
        console.log(error);
      } else {
        cookies.set("clientId", clientId);
      }
    });
  },
  onSignedOutHook: () => {
    const cookies = new Cookies({ TTL: Number.MAX_VALUE });
    const clientId = cookies.get("clientId");
    Meteor.call("userLoggedOut", clientId, (error, clientId) => {
      if (error) {
        console.log(error);
      } else {
        cookies.remove("clientId");
      }
    });
  },
  onVerifyEmailHook: () => {
    window.location.search = "?token=" + Accounts._verifyEmailToken;
  }
});
