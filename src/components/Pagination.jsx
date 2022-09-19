import React from 'react'

export default function Pagination(props) {

    const pages = [];
    for (let i = 1; i <= props.totalPageCount; i++) {
        pages.push(i);
    }

    return (
        <>
            <p> {props.currentPage} of {props.totalPageCount} </p>
            <nav aria-label="page navigation example">
                <ul className="pagination">
                    {pages.map((res, index) => (
                        <li key={index} className="page-item">
                            <a className="page-link" onClick={() => props.paginateData(res)} > {res} </a>
                        </li>
                    ))}

                </ul>
            </nav>
        </>
    )
}
