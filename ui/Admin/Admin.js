Admin({
  isAdmin() {
    const user = Meteor.user();
    return user && user.isAdmin;
  },
  render() {
    return (
      <div b="if: isAdmin">
        <AdminHome b="defer: true" />
      </div>
    );
  }
});
