import { Accounts } from "meteor/std:accounts-basic";
Layout({
  render() {
    <div>
      <Accounts.ui.LoginForm />
      <hr />
      {this.props.children}
    </div>;
  }
});
