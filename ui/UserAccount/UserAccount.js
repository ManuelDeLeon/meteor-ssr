import { AccountsReactComponent } from "meteor/meteoreact:accounts";
import { Meteor } from "meteor/meteor";
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
  render() {
    <div>
      <AccountsReactComponent state={this.accountState()} />
    </div>;
  }
});
