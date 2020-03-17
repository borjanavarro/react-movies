import React, {useReducer} from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import FiltersContext from './contexts/Filters';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function reducer(state, action) {
  switch(action.type) {
    case 'CHANGE_PAGE':
      state.pages.current = action.page;
      return state;

    case 'CHANGE_TOTAL_PAGES':
      state.pages.total = action.totalPages;
      return state;

    case 'CHANGE_MOVIE_&_PAGE':
      state.movie = action.movie;
      state.pages.current = action.page;
      state.cast = '';
      return state;

    case 'CHANGE_MOVIE': 
      state.movie = action.movie;
      state.pages = {current: 1, total: 1};
      state.cast = '';
      return state;

    case 'CHANGE_GENRES_&_YEARS': 
      state.genres = action.genres;
      state.years = action.years;
      state.pages = {current: 1, total: 1};
      return state;

    case 'CHANGE_GENRES_&_YEARS_&_PAGE': 
      state.genres = action.genres;
      state.years = action.years;
      state.pages.current = action.page;
      return state;

    case 'CHANGE_CAST': 
      state.cast = action.cast;
      state.pages = {current: 1, total: 1};
      state.search = '';
      return state;

    case 'CHANGE_CAST_&_PAGE':
      state.cast = action.cast;
      state.pages.current = action.page;
      state.search = '';
      return state;

    case 'RESET':
      return init();

    default:
      return state;
  }
}

function init() {
  return initialValues;
}

const initialValues = {
  pages: { current: 1, total: 1 },
  movie: '',
  genres: '',
  cast: ''
};

function App() {
  const [filters, filtersDispatch] = useReducer(reducer, initialValues, init);

  return (
    <Router>
      <Switch>
        <FiltersContext.Provider value={{filters, filtersDispatch}}>
          <Route exact path="/">
              <MovieList />
          </Route>
          <Route path="/detail/:movieId">
              <MovieDetail />
          </Route>
        </FiltersContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
