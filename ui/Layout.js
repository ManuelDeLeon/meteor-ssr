import { Meteor } from "meteor/meteor";
import { AccountsReact } from "meteor/meteoreact:accounts";
Layout({
  loggedIn() {
    return !!Meteor.user();
  },
  logInOut() {
    if (Meteor.user()) {
      AccountsReact.logout();
    } else {
      window.location.replace("/account/signIn");
    }
  },
  logInOutText() {
    return Meteor.user() ? "Log Out" : "Log In";
  },
  render() {
    <div>
      <button b="click: logInOut, text: logInOutText" /> -<a href="/">Home</a> -
      <a href="/account/changePwd" b="if: loggedIn">
        Change Password
      </a>
      <hr />
      {this.props.children}
    </div>;
  }
});
