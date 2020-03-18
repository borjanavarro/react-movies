import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Pagination = ({totalPages}) => {
    const history = useHistory();
    const location = useLocation();
    const params = useQuery();
    const pageParam = params.get('page');
    const [page, setPage] = useState();

    const handleClick = (nextPage) => {
      window.scrollTo({top: 0, behavior: 'smooth'});
      params.set('page', nextPage);
      history.push(location.pathname + '?' + params.toString());
    }

    useEffect (() => {
      const page = pageParam ? parseInt(pageParam) : 1;
      setPage(page);
    }, [pageParam])

    return (
        <div className="pagination">
            <ul>
                <li 
                  onClick={() => {handleClick(page - 1)}}
                  className={page <= 1 ? 'disabled' : ''}
                  >
                    Previous</li>
                <li className="page">{page}</li>
                <li 
                  onClick={() => {handleClick(page + 1)}}
                  className={page >= totalPages ? 'disabled' : ''}
                  >
                    Next</li>
            </ul>
        </div>
    );
}

export default Pagination;