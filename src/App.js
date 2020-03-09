import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import All from './components/All';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <All />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
