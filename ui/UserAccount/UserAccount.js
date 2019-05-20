import { AccountsReactComponent } from "meteor/meteoreact:accounts";
import { Meteor } from "meteor/meteor";
import renderBag from "/client_server/renderBag";

const states = {
  changepwd: "changePwd",
  forgotpwd: "forgotPwd",
  resetpwd: "resetPwd",
  signin: "signIn",
  signup: "signUp",
  resendverification: "resendVerification"
};

UserAccount({
  accountState() {
    const pathname = this.props.match.params.action.toLowerCase();
    const state = states[pathname] || "signIn";
    if (Meteor.isClient && Meteor.user() && (state === states.signin || state === states.signup)) {
      window.location.replace("/");
    }
    return state;
  },
  token() {
    if (Meteor.isClient) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      return token;
    } else {
      return renderBag.token;
    }
  },
  render() {
    <div>
      <AccountsReactComponent state={this.accountState()} token={this.token()} />
    </div>;
  }
});
