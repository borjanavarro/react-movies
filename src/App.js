import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <MovieList />
        </Route>
        <Route path="/detail/:movieId">
            <MovieDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
