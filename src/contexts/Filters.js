import React from 'react';

const initialValues = {
  pages: { current: 1, total: 1 },
  movie: '',
  genres: '',
  cast: ''
};

export const FiltersContext = React.createContext(initialValues);

export default FiltersContext;
