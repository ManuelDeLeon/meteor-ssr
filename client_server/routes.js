import React from "react";
import { Route } from "react-router-dom";
import { Home } from "/ui/Home/Home";
import { Layout } from "/ui/Layout";
import { Admin } from "/ui/Admin/Admin";
import { UserAccount } from "/ui/UserAccount/UserAccount";
import { AccountsReact } from "meteor/meteoreact:accounts";
import { Cookies } from "meteor/ostrio:cookies";
import { Random } from "meteor/random";
import { Meteor } from "meteor/meteor";

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
  redirects: {
    toSignUp: () => {
      window.location.href = "/account/signUp";
    },
    toSignIn: () => {
      window.location.href = "/account/signIn";
    },
    toForgotPwd: () => {
      window.location.href = "/account/forgotPwd";
    }
  },
  onLoginHook() {
    const cookies = new Cookies({ TTL: Number.MAX_VALUE });
    let clientId = cookies.get("clientId");
    if (!clientId) {
      clientId = Random.secret();
      cookies.set("clientId", clientId, { path: "/" });
    }

    Meteor.call("userLoggedIn", clientId, (error, clientId) => {
      if (error) {
        console.log(error);
      } else {
        cookies.set("clientId", clientId, { path: "/" });
      }
    });
  },
  onLogoutHook() {
    const cookies = new Cookies({ TTL: Number.MAX_VALUE });
    const clientId = cookies.get("clientId");
    Meteor.call("userLoggedOut", clientId, error => {
      if (error) {
        console.log(error);
      } else {
        cookies.remove("clientId");
      }
    });
  },
  onSubmitHook(err, state) {
    if (!err && Meteor.isClient) {
      console.log(state);
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
      } else if (state === "changePwd") {
        window.location.href = "/";
      } else if (state === "resetPwd") {
        window.location.href = "/";
      }
    }
  }
});

export const routes = (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/account/:action" component={UserAccount} />
  </Layout>
);

const routeSubscriptions = {
  "/": ["public", "private", "user", "admin"],
  "/admin": ["user", "admin"]
};

const routeStartsWithSubscriptions = {
  "/account": ["user"]
};

export const getRouteSubscriptions = pathname => {
  return (
    routeSubscriptions[pathname] ||
    Object.keys(routeStartsWithSubscriptions)
      .filter(r => r === pathname || pathname.startsWith(r + "/"))
      .flatMap(route => routeStartsWithSubscriptions[route])
  );
};
