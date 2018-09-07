import React from "react";
import "./Clock.css";
import moment from "moment";
import pack from "../../package.json";

function getDateForHuman(date) {
  return moment(date).format("dddd Do MMMM");
}

function getTimeForHuman(date) {
  return moment(date).format("HH:mm");
}

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  ticker() {
    this.setState({ date: new Date() });
  }
  componentDidMount() {
    this.tick = setInterval(this.ticker.bind(this), 1 * 1000);
  }
  componentWillMount() {
    clearInterval(this.tick);
  }
  render() {
    return (
      <div className="clock-wrapper">
        <div className="clock">
          <div className="time-wrapper">
            <h1 className="time">{getTimeForHuman(this.state.date)}</h1>
            <div className="period-seconds">
              <h3 className="period" />
              <h3 className="seconds" />
            </div>
          </div>
          <h2 className="date">{getDateForHuman(this.state.date)}</h2>
        </div>
      </div>
    );
  }
}
