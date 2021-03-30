import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';
import Lobby from './pages/Lobby';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/room/" component={Room} />
        <Route exact path="/room/:roomId" component={Room} />
      </Switch>
    </Router>
  );
}

export default App;
