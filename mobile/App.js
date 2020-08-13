import React from 'react';

import Routes from './src/routes';

import {StatusBar, YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

function App() {
  return(
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7d40e7"/>
    <Routes/>
    </>
  );
};

export default App;