export const ServerConfig = {
  allow: {
    all: {
      insert: function(userId, doc) {
        return true;
      },
      update: function(userId, doc, fields, modifier) {
        return true;
      },
      remove: function(userId, doc) {
        return true;
      },
      fetch: []
    },
    owner: {
      insert: function(userId, doc) {
        return userId && doc.owner === userId;
      },
      update: function(userId, doc, fields, modifier) {
        return doc.owner === userId;
      },
      remove: function(userId, doc) {
        return doc.owner === userId;
      },
      fetch: ["owner"]
    },
    admin: {
      insert: function(userId, doc) {
        return (
          userId &&
          Meteor.users.findOne({ _id: userId, isAdmin: true }, { isAdmin: 1 })
        );
      },
      update: function(userId, doc, fields, modifier) {
        return (
          userId &&
          Meteor.users.findOne({ _id: userId, isAdmin: true }, { isAdmin: 1 })
        );
      },
      remove: function(userId, doc) {
        return (
          userId &&
          Meteor.users.findOne({ _id: userId, isAdmin: true }, { isAdmin: 1 })
        );
      },
      fetch: []
    }
  }
};
