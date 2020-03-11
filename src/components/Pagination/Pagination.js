import React, { useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import FiltersContext from '../../contexts/Filters';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Pagination = () => {
    const { filters } = useContext(FiltersContext);
    const history = useHistory();
    const location = useLocation();
    const params = useQuery();
    const page = parseInt(filters.pages.current);

    const handleClick = (nextPage) => {
      params.set('page', nextPage);
      history.push(location.pathname + '?' + params.toString());
    }

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
                        disabled={page >= parseInt(filters.pages.total)}>Next
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;