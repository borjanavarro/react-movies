import React, {useReducer} from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import MovieList from './components/MovieList';
import FiltersContext from './contexts/Filters';

function reducer(state, action) {
  switch(action.type) {
    case 'CHANGE_SEARCH_&_PAGE':
      state.search = action.search;
      state.pages.current = action.page;
      return state;

    case 'CHANGE_PAGE':
      state.pages.current = action.page;
      return state;

    case 'CHANGE_TOTAL_PAGES':
      state.pages.total = action.totalPages;
      return state;

    case 'CHANGE_SEARCH': 
      state.search = action.search;
      state.pages = {current: 1, total: 1};
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
  search: ''
};

function App() {
  const [filters, filtersDispatch] = useReducer(reducer, initialValues, init);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <FiltersContext.Provider value={{filters, filtersDispatch}}>
            <MovieList />
          </FiltersContext.Provider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
