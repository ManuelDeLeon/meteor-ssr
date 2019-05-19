import React from "react";
import { Route } from "react-router-dom";
import { Home } from "../ui/Home/Home";
import { Layout } from "../ui/Layout";
import { ConfirmEmail } from "../ui/ConfirmEmail";
import { Admin } from "../ui/Admin/Admin";
import { UserAccount } from "../ui/UserAccount/UserAccount";
import { AccountsReact } from "meteor/meteoreact:accounts";
import { Cookies } from "meteor/ostrio:cookies";
import { Random } from "meteor/random";

AccountsReact.configure({
  confirmPassword: false,
  enablePasswordChange: true,
  showForgotPasswordLink: true,
  loginAfterSignup: true,
  passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL",
  mapStateToRoute: {
    signIn: "/account/signIn",
    signUp: "/account/signUp",
    forgotPwd: "/account/forgotPwd",
    changePwd: "/account/changePwd",
    resetPwd: "/account/resetPwd",
    resendVerification: "/account/resendVerification"
  },
  onLoginHook() {
    console.log("onLoginHook");
    const cookies = new Cookies({ TTL: Number.MAX_VALUE });
    // const clientId = cookies.get("clientId");
    const clientId = Random.secret();
    cookies.set("clientId", clientId, { path: "/" });
    Meteor.call("userLoggedIn", clientId, (error, clientId) => {
      if (error) {
        console.log(error);
      } else {
        cookies.set("clientId", clientId, { path: "/" });
      }
    });
  },
  onLogoutHook() {
    console.log("onLogoutHook");
    // if (!Meteor.isClient) return;

    const cookies = new Cookies({ TTL: Number.MAX_VALUE });
    const clientId = cookies.get("clientId");
    console.log(`calling userloggedOut with clientId: ${clientId}`);
    Meteor.call("userLoggedOut", clientId, error => {
      if (error) {
        console.log(error);
      } else {
        console.log("Removing clientId cookie");
        cookies.remove("clientId");
      }
    });
  },
  onSubmitHook(err, state) {
    console.log("onSubmitHook: " + state);
    if (!err && Meteor.isClient) {
      if (state === "signIn") {
      }
      if (state === "signUp") {
        Meteor.call("userLoggedIn", (error, clientId) => {
          if (error) {
            console.log(error);
          } else {
            const cookies = new Cookies({ TTL: Number.MAX_VALUE });
            cookies.set("clientId", clientId, { path: "/" });
            window.location.href = "/";
          }
        });
      }
    }
  }
});

export default (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/account/:action" component={UserAccount} />
    <Route exact path="/confirmEmail" component={ConfirmEmail} />
  </Layout>
);
