import React from "react";
import "./Attendee.css";
import Avatar from "react-avatar";

export default class Attendee extends React.Component {
  render() {
    const initials = (this.props.email || "")
      .replace(/@.+/g, "")
      .split(".")
      .map(e => e.substr(0, 1))
      .join(" ")
      .toUpperCase();

    return (
      <li
        className={
          "attendee " +
          (this.props.organizer ? "-organizer" : "-invited") +
          (" -" + this.props.responseStatus)
        }
      >
        <div className="avatar">
          <Avatar
            round={true}
            size={this.props.organizer ? 56 : 38}
            name={initials}
            email={this.props.email}
          />
          <span className="status" />
        </div>
        <div className="name">
          <div>
            <b>{this.props.displayName}</b>
          </div>
          <div>{this.props.organizer ? "Organizer" : ""}</div>
        </div>
      </li>
    );
  }
}
