import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Pagination = (props) => {
    const { page, totalPages } = props;
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    let history = useHistory();
    const location = useLocation();
    const params = useQuery();

    const handleClick = (nextPage) => {
      setHasPrevious(false);
      setHasNext(false);
      params.set('page', nextPage);
      history.push(location.pathname + '?' + params.toString());
    }

    useEffect( () => {
      setHasNext(page !== totalPages);
      setHasPrevious(page !== 1);
    }, [page, totalPages])

    return (
        <div className="pagination">
            <ul>
                <li>
                    <button
                        onClick={() => { handleClick(page - 1) }}
                        disabled={!hasPrevious}>Previous
                    </button>
                </li>
                <li className="active"><p>{page}</p></li>
                <li>
                    <button
                        onClick={() => { handleClick(page + 1) }}
                        disabled={!hasNext}>Next
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;