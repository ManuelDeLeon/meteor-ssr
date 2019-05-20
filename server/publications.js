import { Meteor } from "meteor/meteor";
import { PublicCount, PrivateCount, AdminCount } from "/client_server/collections";

Meteor.publish("public", function() {
  return PublicCount.find({}, { limit: 1 });
});

Meteor.publish("private", function() {
  return PrivateCount.find({ owner: Meteor.userId() }, { limit: 1 });
});

Meteor.publish("user", function() {
  return Meteor.users.find({ _id: this.userId }, { fields: { isAdmin: 1 } });
});

Meteor.publish("admin", function() {
  return Meteor.users.findOne({ _id: Meteor.userId(), isAdmin: true }, { isAdmin: 1 })
    ? [AdminCount.find({}, { limit: 1 })]
    : [];
});
