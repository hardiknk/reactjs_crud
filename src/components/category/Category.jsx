// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import http from '../../http';
import testData from '../../test.json'
import Pagination from '../Pagination';

export default function Category() {

    const [Categories, setCategories] = useState([]);
    const [pagesize, setPagesize] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(0);



    const fetchCategoryData = async () => {
        await http.get("/category").then((res) => {
            setCategories(res.data.data);
            setPagesize(res.data.paginate.page_size);
            setTotalRecords(res.data.paginate.total_item);
            setCurrentPage(res.data.paginate.current_page);
            setTotalPageCount(res.data.paginate.total_page_count);
        });
    }


    useEffect(() => {
        fetchCategoryData()
    }, [])

    const handleDeleteCategory = (id) => {
        http.delete("category/" + id).then(res => {
            fetchCategoryData()
        });
    }

    const paginateData = (pageNumber) => {
        // setCurrentPage(pageNumber);
    }

    return (
        <div className='container table-wrapper-scroll-y my-custom-scrollbar' style={{ marginTop: 30 }}>
            <div style={{ float: 'right', margin: '10px' }}>
                <Link className='btn btn-primary' to="/add-category"> Add Category </Link>
            </div>

            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col"> Status </th>
                        <th scope="col"> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {Categories.length > 0 && (
                        Categories.map((res, index) => (
                            <tr key={index}>
                                <td>{res.id}</td>
                                <td>{res.title}</td>
                                <td>{res.description}</td>
                                <td>{res.is_active == "y" ? "active" : "inactive"}</td>
                                <td> <Link className='btn btn-warning' to={{ pathname: "/edit-category/" + res.id }} > Edit  </Link>
                                    <button className='btn btn-danger' onClick={eve => handleDeleteCategory(res.id)} > Delete  </button>
                                </td>

                            </tr>
                        ))
                    )}

                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalCount={totalRecords} totalPageCount={totalPageCount} pageSize={pagesize} paginateData={paginateData} />
        </div>
    )
}
