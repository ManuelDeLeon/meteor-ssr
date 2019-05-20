import { Meteor } from "meteor/meteor";
import { ServerConfig } from "./ServerConfig";
import { PublicCount, PrivateCount, AdminCount } from "/client_server/collections";

export const UserTokens = new Mongo.Collection("userTokens");

if (!PublicCount.findOne()) PublicCount.insert({ count: 0 });

PublicCount.allow(ServerConfig.allow.all);

PrivateCount.allow(ServerConfig.allow.owner);
PrivateCount.before.insert(function(userId, doc) {
  doc.owner = userId;
});

if (!AdminCount.findOne())
  AdminCount.insert({
    count: 0
  });
AdminCount.allow(ServerConfig.allow.admin);

Meteor.publish("main", function() {
  return [
    PublicCount.find({}, { limit: 1 }),
    PrivateCount.find({ owner: Meteor.userId() }, { limit: 1 }),
    Meteor.users.find({ _id: this.userId }, { fields: { isAdmin: 1 } })
  ].concat(
    Meteor.users.findOne({ _id: Meteor.userId(), isAdmin: true }, { isAdmin: 1 })
      ? [AdminCount.find({}, { limit: 1 })]
      : []
  );
});
