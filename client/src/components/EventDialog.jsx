import React from "react";
import moment from "moment";
import Attendee from "./Attendee.jsx";
import "./EventDialog.css";

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

export default class EventDialog extends React.Component {
  render() {
    const eventDates = parseEventDates(this.props);
    const attendees = (this.props.attendees || []).sort(
      (a, b) => ~~a.organizer < ~~b.organizer
    );

    return (
      <div className="event-dialog">
        <button onClick={this.props.onClose} className="close">
          <img src="/img/close.svg" />
        </button>

        <div class="event-dialog-inner">
          <h2 className="cal-time">
            {this.props.allDay
              ? "all day"
              : `${eventDates.start} - ${eventDates.end}`}
          </h2>
          <h2>{this.props.name}</h2>
          <p dangerouslySetInnerHTML={{ __html: this.props.description }} />

          <h3>{attendees.length} attendees</h3>
          <ul className="attendees -full">
            {attendees.map(attendee => {
              return <Attendee key={attendee.email} {...attendee} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
