import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function usePage() {
  let queryParam = useQuery().get('page');
  queryParam = queryParam ? parseInt(queryParam) : 1;
  
  const [page, setPage] = useState(queryParam);

  useEffect ( () => {
    setPage(queryParam);
  }, [queryParam]);

  return [page, setPage];
}

export default usePage;