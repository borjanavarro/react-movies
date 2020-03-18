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
                <li>
                    <button
                        onClick={() => { handleClick(page - 1) }}
                        disabled={page <= 1}>Previous
                    </button>
                </li>
                <li className="active"><p>{page}</p></li>
                <li>
                    <button
                        onClick={() => { handleClick(page + 1) }}
                        disabled={page >= totalPages}>Next
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;