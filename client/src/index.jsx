import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import App from './App.jsx';

ReactDOM.render((
   <BrowserRouter>
      <React.Fragment>
         <App />
      </React.Fragment>
   </BrowserRouter>
), document.getElementById('root'));
