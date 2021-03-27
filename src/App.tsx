import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/room/" component={Room} />
        <Route exact path="/room/:roomId" component={Room} />
      </Switch>
    </Router>
  );
}

export default App;
