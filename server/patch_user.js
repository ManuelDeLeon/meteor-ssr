import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { UserTokens } from "./collections";

export function patchUser(clientId, token) {
  const AccountsUser = Accounts.user;
  Accounts.user = function() {
    if (Meteor.isClient) {
      return AccountsUser();
    } else {
      const user = UserTokens.findOne({ tokens: clientId });
      if (user) {
        return Meteor.users.findOne(user.userId);
      } else {
        return Meteor.users.findOne({
          "services.email.verificationTokens": { $elemMatch: { token: token } }
        });
      }
    }
  };
}
