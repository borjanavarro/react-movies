import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import './styles.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Pagination = ({totalPages}) => {
    const history = useHistory();
    const location = useLocation();
    const params = useQuery();
    const pageParam = params.get('page');
    const [page, setPage] = useState();

    const handleClick = (e, nextPage) => {
      if ( !e.target.classList.contains('disabled') ) {
        window.scroll(0, 0);
        params.set('page', nextPage);
        history.push(location.pathname + '?' + params.toString());
      }
    }

    useEffect (() => {
      const page = pageParam ? parseInt(pageParam) : 1;
      setPage(page);
    }, [pageParam])

    return (
        <div className="pagination">
            <ul>
                <li 
                  onClick={(e) => {handleClick(e, page - 1)}}
                  className={page <= 1 ? 'disabled' : ''}
                  >
                    Previous</li>
                <li className="page">{page}</li>
                <li 
                  onClick={(e) => {handleClick(e, page + 1)}}
                  className={page >= totalPages ? 'disabled' : ''}
                  >
                    Next</li>
            </ul>
        </div>
    );
}

export default Pagination;