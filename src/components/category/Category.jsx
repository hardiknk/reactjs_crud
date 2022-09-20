// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import http from '../../http';
import testData from '../../test.json'
import Pagination from '../Pagination';
import { ToastContainer, toast } from 'react-toastify';


export default function Category() {

    const [Categories, setCategories] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [status, setStatus] = useState(0);

    //toaster message code 
    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const fetchCategoryData = async (cpNumber = null) => {
        const cPage = cpNumber !== null ? cpNumber : currentPage;

        await http.get("/category", { params: { page: cPage } }).then((res) => {
            setCategories(res.data.data);
            setTotalRecords(res.data.paginate.total_item);
            setCurrentPage(res.data.paginate.current_page);
            setTotalPageCount(res.data.paginate.total_page_count);
        });
    }


    //change the status on click 
    const handleStatus = (eve) => {
        showToastMessage("Category Update Successfully");
        const name = eve.target.name;
        const value = eve.target.checked;
        const category_id = eve.target.id;
        http.patch("/category/" + category_id, { category_id: category_id, category_status: value }).then(res => {
            fetchCategoryData();
        });

    }

    useEffect(() => {
        fetchCategoryData();
    }, [])

    const handleDeleteCategory = (id) => {
        http.delete("category/" + id).then(res => {
            fetchCategoryData();
        });
        showToastMessage("Category Delete Successfully");
    }

    const paginateData = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchCategoryData(pageNumber);
    }

    return (
        <div className='container table-wrapper-scroll-y my-custom-scrollbar' style={{ marginTop: 30 }}>
            <div style={{ float: 'right', margin: '10px' }}>
                <Link className='btn btn-primary' to="/add-category"> Add Category </Link>
            </div>

            <table className="table table-hover table-striped table-bordered table-responsive">
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
                                <td> <label className="switch">
                                    <input type="checkbox" checked={res.is_active == "y" ? "checked" : ""} id={res.id} onChange={handleStatus} />
                                    <span className="slider round"></span>
                                </label> </td>

                                <td> <Link className='btn btn-warning' to={{ pathname: "/edit-category/" + res.id }} > Edit  </Link>
                                    <button className='btn btn-danger' onClick={eve => handleDeleteCategory(res.id)} > Delete  </button>
                                </td>

                            </tr>
                        ))
                    )}

                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalCount={totalRecords} totalPageCount={totalPageCount} paginateData={paginateData} />
            <ToastContainer />

        </div>
    )
}
