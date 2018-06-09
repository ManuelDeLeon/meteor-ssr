import React from "react";
import { Accounts, STATES } from "meteor/std:accounts-ui";
import { _ } from "meteor/underscore";

/**
 * Form.propTypes = {
 *   fields: React.PropTypes.object.isRequired,
 *   buttons: React.PropTypes.object.isRequired,
 *   error: React.PropTypes.string,
 *   ready: React.PropTypes.bool
 * };
 */
class Form extends Accounts.ui.Form {
  render() {
    const {
      hasPasswordService,
      oauthServices,
      fields,
      buttons,
      error,
      message,
      ready = true,
      className,
      formState
    } = this.props;
    return (
      <form
        ref={ref => (this.form = ref)}
        className={["accounts-ui", className, ready ? "ready" : null].join(" ")}
      >
        {Object.keys(fields).length > 0 ? (
          <Accounts.ui.Fields fields={fields} />
        ) : null}
        {buttons["switchToPasswordReset"] ? (
          <Accounts.ui.Button
            className="forgot-password"
            {...buttons["switchToPasswordReset"]}
          />
        ) : null}
        <Accounts.ui.Buttons
          buttons={_.omit(buttons, "switchToPasswordReset")}
        />
        {formState == STATES.SIGN_IN || formState == STATES.SIGN_UP ? (
          <div className="or-sep">
            <Accounts.ui.PasswordOrService oauthServices={oauthServices} />
          </div>
        ) : null}
        {formState == STATES.SIGN_IN || formState == STATES.SIGN_UP ? (
          <Accounts.ui.SocialButtons oauthServices={oauthServices} />
        ) : null}
        <Accounts.ui.FormMessage {...message} />
      </form>
    );
  }
}

class Buttons extends Accounts.ui.Buttons {}
class Button extends Accounts.ui.Button {}
class Fields extends Accounts.ui.Fields {}
class Field extends Accounts.ui.Field {
  render() {
    const {
      id,
      hint,
      label,
      type = "text",
      onChange,
      required = false,
      className,
      defaultValue = ""
    } = this.props;
    const { mount = true } = this.state;
    return mount ? (
      <div className="field-group">
        <label htmlFor={id}>{label}</label>
        <div className="field">
          <input
            id={id}
            name={id}
            type={type}
            ref={ref => (this.input = ref)}
            autoCorrect="off"
            onChange={onChange}
            placeholder={hint}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    ) : null;
  }
}
class SocialButtons extends Accounts.ui.SocialButtons {
  render() {
    let { oauthServices = {}, className = "social-buttons" } = this.props;
    return (
      <div
        className={[
          className,
          `cols-${Object.keys(oauthServices).length}`
        ].join(" ")}
      >
        {Object.keys(oauthServices).map((id, i) => {
          return (
            <div className="col" key={i}>
              <Accounts.ui.Button
                className={`button ${id}`}
                {..._.omit(oauthServices[id], "className")}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
class FormMessage extends Accounts.ui.FormMessage {}
// Notice! Accounts.ui.LoginForm manages all state logic at the moment, so avoid
// overwriting this one, but have a look at it and learn how it works. And pull
// requests altering how that works are welcome.

// Alter provided default unstyled UI.
Accounts.ui.Form = Form;
Accounts.ui.Buttons = Buttons;
Accounts.ui.Button = Button;
Accounts.ui.Fields = Fields;
Accounts.ui.Field = Field;
Accounts.ui.SocialButtons = SocialButtons;
Accounts.ui.FormMessage = FormMessage;

// Export the themed version.
export { Accounts, STATES };
export default Accounts;
