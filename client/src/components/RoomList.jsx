import React from "react";
import "./RoomList.css";
import swal from "sweetalert";

import RoomRow from "./RoomRow.jsx";
import { withRouter, Redirect } from "react-router-dom";

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      idRoom: localStorage.idRoom
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(id) {
    const room = this.state.rooms.find(e => e.id === id);
    swal({
      title: "Change device room",
      text: "Wanna change this device room to " + room.name,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(yes => {
      if (!yes) return;
      localStorage.idRoom = room.id;
      this.setState({
        idRoom: room.id
      });
    });
  }
  componentDidMount() {
    fetch("/api/rooms")
      .then(response => response.json())
      .then(data =>
        this.setState({
          rooms: data
        })
      );
  }
  render() {
    if (this.state.idRoom) {
      return <Redirect to={"/rooms/" + this.state.idRoom} />;
    }
    return (
      <div>
        <h1>Rooms</h1>
        <hr />
        <ul className="room-list">
          {this.state.rooms.map(room => {
            return (
              <RoomRow
                name={room.name}
                key={room.id}
                id={room.id}
                onClick={this.onClick}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(RoomList);
