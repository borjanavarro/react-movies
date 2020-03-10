import React from 'react';
import { useHistory } from "react-router-dom";

const Pagination = (props) => {
    const { page, setPage, hasNext } = props;
    const hasPrevious = page !== 1;
    let history = useHistory();
    const url = '/?';

    const handleClick = (nextPage) => {
      setPage(nextPage);
      history.push(url + 'page=' + nextPage);
    }

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