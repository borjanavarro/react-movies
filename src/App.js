import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import MovieList from './components/MovieList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MovieList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
