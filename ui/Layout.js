import { Meteor } from "meteor/meteor";
import { AccountsReact } from "meteor/meteoreact:accounts";
Layout({
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
      <button b="click: logInOut, text: logInOutText" />
      <hr />
      {this.props.children}
    </div>;
  }
});
