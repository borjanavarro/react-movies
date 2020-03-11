import React, {useState} from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import MovieList from './components/MovieList';

import FiltersContext from './contexts/Filters';

function App() {
  const [search, setSearch] = useState('');

  return (
    <Router>
      <Switch>
        <Route path="/">
          <FiltersContext.Provider value={{search, setSearch}}>
            <MovieList />
          </FiltersContext.Provider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
