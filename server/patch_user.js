import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { UserTokens } from "./collections";

const originalAccountsUser = Accounts.user;

export function getUser(clientId) {
  let retUser = undefined;
  if (clientId) {
    const userToken = UserTokens.findOne({ tokens: clientId });
    if (userToken) {
      retUser = Meteor.users.findOne(userToken.userId);
    } else {
      retUser = Meteor.users.findOne({
        "services.email.verificationTokens": { $elemMatch: { token: clientId } }
      });
    }
  }
  return function() {
    return retUser;
  };
}

export function patchUser(user) {
  Accounts.user = user;
}

export function restoreUser() {
  Accounts.user = originalAccountsUser;
}
