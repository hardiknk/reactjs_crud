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
                    {/* <li className="page-item">
                        <a className="page-link" onClick={() => props.paginateData(res)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li> */}
                    {pages.map((res, index) => (
                        <li key={index} className={res == props.currentPage ? 'page-item active' : 'page-item'} >
                            <a className="page-link" onClick={() => props.paginateData(res)} > {res} </a>
                        </li>
                    ))}

                    {/* <li className="page-item">
                        <a className="page-link" onClick={() => props.paginateData(res)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li> */}

                </ul>
            </nav>
        </>
    )
}
