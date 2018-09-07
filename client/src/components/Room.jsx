import React from 'react';
import './Room.css';
import Clock from './Clock.jsx';
import Event from './Event.jsx';
import Timeline from './Timeline.jsx';
import Slider from "react-slick";

class Header extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', e => {
      if (this.videoElement) {
        const scroll = -1 * Math.min(150, 0.5 * window.pageYOffset);
        this.videoElement.style.transform = `translateY(${scroll}px)`;
      }
    }, false);
  }
  render() {
    return (
      <React.Fragment>
        <div ref={video => this.videoElement = video} className="room-video-wrapper">
          <div className="room-video-wrapper-inner">
            <video className="room-video" src={this.props.video_url} autoPlay={true} loop={true} muted="muted" />
          </div>
        </div>
        <div className="room-header">
          <div className="room-arrow">
            <img src={"/img/arrow-" + this.props.arrow + ".svg"} />
          </div>
          <h3 className="room-title">MEETING ROOM</h3>
          <h1 className="room-name">{this.props.name}</h1>
          <h4>{this.props.capacity} people | Chromecast | Apple TV | ConferenceMic</h4>
        </div>
      </React.Fragment>
    )
  }
}

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.tick = null;

    this.state = {
      id: props.match.params.id,
      lastUpdatedAt: Date.now(),
      data: null,
      now: null,
      next: null,
      quotes: null
    };
  }
  fetchData = () => {
    fetch(`/api/rooms/${this.state.id}/now`)
      .then(response => response.json())
      .then(data => this.setState({ now: data }));
    fetch(`/api/rooms/${this.state.id}/next`)
      .then(response => response.json())
      .then(data => this.setState({ next: data }));

    fetch(`/api/quotes`)
      .then(response => response.json())
      .then(data => this.setState({ quotes: data }));
  }
  componentDidMount() {
    fetch(`/api/rooms/${this.state.id}`)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));

    this.fetchData();
    this.tick = setInterval(this.fetchData, 10 * 1000);
  }
  componentWillUnmount() {
    clearInterval(this.tick);
  }
  getNextEvents() {
    if (this.state.next == null) {
      return <div></div>;
    }

    return <Timeline events={this.state.next} />;
  }
  getNowEvent() {
    if (this.state.now == null) {
      return (
        <div>
          <div className="now-alert">MEETING IN PROGRESS</div>
          <h1>No meeting in progress</h1>
          <h3>(Fewer meetings are better)</h3>
        </div>
      );
    }

    return (
      <div>
        <div className="now-alert">MEETING IN PROGRESS</div>
        <Event now={true} {...this.state.now} />
      </div>
    );
  }
  getQuote() {
    return (
      <div>
        <div className="next-alert">STRILLONE</div>
        <Slider {...{
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        }}>
          {(this.state.quotes || []).map(q => {
            return <div class="quote-element" dangerouslySetInnerHTML={{ __html: q.text }}></div>;
          })}
        </Slider>
      </div>
    );
  }
  render() {
    return (
      <div className="room">
        <img className="clip" src="/img/clip.svg" />
        <Clock />
        <Header {...this.state.data} />
        <div className="now">
          {this.getNowEvent()}
        </div>
        <div className="quote">
          {this.getQuote()}
        </div>
        <div className="next">
          <div className="next-alert">{this.state.next ? "NEXT MEETINGS" : "NO MORE MEETINGS - LET'S GO TO APERISPRITZ"}</div>
          {this.getNextEvents()}
        </div>
      </div>
    );
  }
}
