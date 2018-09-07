import React from "react";
import moment from "moment";
import Event from "./Event.jsx";
import "./Timeline.css";

const TIMEZONE_OFFSET = -(new Date().getTimezoneOffset() / 60);
const HOUR_HEIGHT = 320;

function getStartOfTimeline(events) {
  let hour = null;
  events.forEach(e => {
    const h = ~~moment(e.start)
      .utcOffset(TIMEZONE_OFFSET)
      .format("H");
    if (hour == null || h < hour) hour = h;
  });
  return hour;
}

function getEndOfTimeline(events) {
  let hour = null;
  events.forEach(e => {
    const h = ~~moment(e.end)
      .utcOffset(TIMEZONE_OFFSET)
      .format("H");
    if (hour == null || h > hour) hour = h;
  });
  return hour;
}

function getEventInTimelineStyle(e, startHour) {
  const style = {};
  const startOfTimeline = moment()
    .utcOffset(TIMEZONE_OFFSET)
    .hours(startHour)
    .minutes(0)
    .milliseconds(0);
  const startOfEvent = moment(e.start)
    .utcOffset(TIMEZONE_OFFSET)
    .milliseconds(0);

  let top = startOfEvent.diff(startOfTimeline, "minutes");
  top = Math.floor((top + 5 / 2) / 5) * 5;
  style.top = (top / 60) * HOUR_HEIGHT;

  let height = moment(e.end)
    .utcOffset(TIMEZONE_OFFSET)
    .diff(startOfEvent, "minutes");
  style.height = -1 + (height / 60) * HOUR_HEIGHT;

  return style;
}

export default function Timeline(props) {
  let startHour = getStartOfTimeline(props.events);
  let latestHour = getEndOfTimeline(props.events);

  const hours = [];
  for (let i = startHour; i <= latestHour; i++) {
    hours.push(i);
  }

  return (
    <div className="timeline">
      <div className="timeline-steps">
        {hours.map(h => {
          return (
            <div
              key={h}
              className="timeline-step"
              style={{ height: HOUR_HEIGHT }}
            >
              <div className="timeline-digit">
                {(h < 10 ? "0" + h : h) + ":00"}
              </div>
              <div className="timeline-border" />
            </div>
          );
        })}
      </div>
      <div className="timeline-events">
        {props.events.map(e => {
          return (
            <div
              key={e.id}
              className="timeline-event"
              style={getEventInTimelineStyle(e, startHour)}
            >
              <Event {...e} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
