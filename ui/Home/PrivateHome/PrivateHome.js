import { PrivateCount } from "/client_server/collections";
PrivateHome({
  privateCount() {
    const user = Meteor.user();
    if (user) {
      const pCount = PrivateCount.findOne({ owner: user._id });
      if (pCount) {
        return pCount.count;
      } else {
        PrivateCount.insert({ owner: user._id, count: 0 });
        return 0;
      }
    } else {
      throw new Error("User not logged in.");
    }
  },
  incrementPrivate() {
    return PrivateCount.update(PrivateCount.findOne()._id, {
      $inc: { count: 1 }
    });
  },
  render() {
    <div>
      Private Count: <label b="text: privateCount" />{" "}
      <button b="click: incrementPrivate">Increment Private Count</button>
    </div>;
  }
});
