import { AdminCount } from "../../../client_server/collections";
AdminHome({
  adminCount() {
    return AdminCount.findOne().count;
  },
  incrementAdmin() {
    return AdminCount.update(AdminCount.findOne()._id, {
      $inc: { count: 1 }
    });
  },
  render() {
    <div>
      Admin Count: <label b="text: adminCount" />{" "}
      <button b="click: incrementAdmin">Increment Admin Count</button>
    </div>;
  }
});
