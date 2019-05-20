import { Meteor } from "meteor/meteor";
import { UserTokens } from "./collections";
import { Random } from "meteor/random";

Meteor.methods({
  userLoggedIn(clientId) {
    if (!clientId) {
      clientId = Random.secret();
    }
    const userId = Meteor.userId();

    const userToken = UserTokens.findOne({ $or: [{ userId: userId }, { tokens: clientId }] });
    if (userToken) {
      if (userToken.tokens.indexOf(clientId) == -1) {
        userToken.tokens.push(clientId);
        UserTokens.update(userToken._id, { $set: userToken });
      } else if (!userToken.userId) {
        userToken.userId = userId;
        UserTokens.update(userToken._id, { $set: userToken });
      }
    } else {
      UserTokens.insert({
        userId: userId,
        tokens: [clientId]
      });
    }

    return clientId;
  },
  userLoggedOut(clientId) {
    const userTokens = UserTokens.findOne({ tokens: clientId });
    if (userTokens) {
      Meteor.users.update(userTokens.userId, {
        $set: { "services.resume.loginTokens": [] }
      });
      UserTokens.remove({ tokens: clientId });
    }
  }
});
