import React from 'react';

const FiltersContext = React.createContext({
  search: '',
  setSearch: () => {}
});

export default FiltersContext;
