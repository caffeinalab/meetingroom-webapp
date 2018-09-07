import React from "react";
import moment from "moment";
import Attendee from "./Attendee.jsx";
import EventDialog from "./EventDialog.jsx";
import "./Event.css";

const TIMEZONE_OFFSET = -(new Date().getTimezoneOffset() / 60);

function parseEventDates(e) {
  const x = {};
  if (e.start)
    x.start = moment(e.start)
      .utcOffset(TIMEZONE_OFFSET)
      .format("HH:mm");
  if (e.end)
    x.end = moment(e.end)
      .utcOffset(TIMEZONE_OFFSET)
      .format("HH:mm");
  return x;
}

export default class Event extends React.Component {
  state = {
    showModal: false
  };
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  render() {
    if (Object.keys(this.props).length === 0) {
      return <div className="free">No event.</div>;
    }

    const eventDates = parseEventDates(this.props);
    const attendees = (this.props.attendees || []).sort(
      (a, b) => ~~a.organizer < ~~b.organizer
    );

    return (
      <React.Fragment>
        {this.state.showModal && (
          <EventDialog onClose={this.toggleModal} {...this.props} />
        )}

        <div onClick={this.toggleModal} className="event">
          <h2 className="cal-time">
            {this.props.allDay
              ? "all day"
              : `${eventDates.start} - ${eventDates.end}`}
          </h2>
          <h2>{this.props.name}</h2>
          <p dangerouslySetInnerHTML={{ __html: this.props.description }} />

          <ul className="attendees">
            {attendees.map(attendee => {
              return <Attendee key={attendee.email} {...attendee} />;
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
