import { PublicCount } from "../../client_server/collections";

Home({
  publicCount() {
    return PublicCount.findOne().count;
  },
  incrementPublic() {
    return PublicCount.update(PublicCount.findOne()._id, {
      $inc: { count: 1 }
    });
  },
  isLoggedIn() {
    return !!Meteor.user();
  },
  isAdmin() {
    const user = Meteor.user();
    return user && user.isAdmin;
  },
  render() {
    <div>
      <div>
        Public Count: <label b="text: publicCount" />{" "}
        <button b="click: incrementPublic">Increment Public Count</button>
      </div>

      <div b="if: isLoggedIn">
        <PrivateHome />
      </div>

      <a b="if: isAdmin" href="/admin">
        Admin Section
      </a>
    </div>;
  }
});
