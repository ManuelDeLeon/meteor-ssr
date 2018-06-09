import React from "react";
import { Accounts } from "meteor/accounts-base";

function isObject(obj) {
  return obj === Object(obj);
}

export class FormMessage extends React.Component {
  render() {
    let {
      message,
      type,
      className = "message",
      style = {},
      deprecated
    } = this.props;
    message = isObject(message) ? message.message : message; // If message is object, then try to get message from it
    return message ? (
      <div style={style} className={[className, type].join(" ")}>
        {message}
      </div>
    ) : null;
  }
}

Accounts.ui.FormMessage = FormMessage;
