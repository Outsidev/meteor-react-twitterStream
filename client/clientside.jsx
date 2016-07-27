console.log("Hayo, pleb!");
import React from 'react';
import {render} from 'react-dom';

import App from '../libs/App.jsx';

Meteor.startup(()=>{
  render(
    <App/>,
    document.getElementById('rendeer')
  );
});
