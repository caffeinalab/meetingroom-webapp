import React from 'react';

import { Switch, Route } from 'react-router-dom';
import RoomList from './components/RoomList.jsx';
import Room from './components/Room.jsx';
import moment from 'moment';
import './App.css';

class AppFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: 'v0',
      lastUpdatedAt: Date.now()
    };
  }
  onHeartbeat = (e) => {
    this.setState({
      version: 'v' + e.detail.version,
      lastUpdatedAt: Date.now()
    });
  }
  componentDidMount() {
    window.addEventListener('heartbeat', this.onHeartbeat, false);
  }
  componentWillUnmount() {
    window.removeEventListener('heartbeat', this.onHeartbeat, false);
  }
  render() {
    return (
      <footer className="footer">
        <span className="version">{this.state.version}</span>
        &nbsp;-&nbsp;
        <span className="last-contact">Last contact: {moment(this.state.lastUpdatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      </footer>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={RoomList} />
          <Route exact path='/rooms' component={RoomList} />
          <Route path='/rooms/:id' component={Room} />
        </Switch>
      </main>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.heartbeat = null;
  }
  componentDidMount() {
    this.checkHeartBeat();
    setInterval(this.checkHeartBeat, 30 * 1000);
  }
  checkHeartBeat = () => {
    fetch('/api/heartbeat')
      .then(response => response.json())
      .then(response => {
        window.dispatchEvent(new CustomEvent('heartbeat', {
          detail: response
        }));
        if (response != null) {
          this.heartbeat = this.heartbeat || response;
          if (this.heartbeat.version !== response.version) {
            window.location.href = '/';
          }
        }
      });
  }
  render() {
    return (
      <React.Fragment>
        <Main />
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default App;