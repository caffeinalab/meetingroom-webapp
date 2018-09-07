import React from "react";
import "./RoomRow.css";

export default class RoomRow extends React.Component {
  render() {
    return (
      <li
        onClick={() => this.props.onClick(this.props.id)}
        className="room-row"
      >
        {this.props.name}
      </li>
    );
  }
}
