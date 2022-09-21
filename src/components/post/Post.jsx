import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import http from '../../http';
import Pagination from '../Pagination';

export default function Post() {

    // console.log("hii hardik");
    //toaster message code 
    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const [posts, setPosts] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(0);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async (cNumber = null) => {
        const cPage = cNumber !== null ? cNumber : currentPage;
        await http.get("posts/", {
            params: {
                page: cPage
            }
        }).then((res) => {
            setPosts(res.data.data);
            setcurrentPage(res.data.paginate.current_page);
            setTotalPageCount(res.data.paginate.total_page_count);
            setTotalRecords(res.data.paginate.total_item);

        });
    }


    const handleStatus = (eve) => {
        showToastMessage("Post Status Update Successfully");
        const name = eve.target.name;
        const value = eve.target.checked;
        const post_id = eve.target.id;
        http.patch("/posts/" + post_id, { post_id: post_id, post_status: value }).then(res => {
            getPosts();
        });
    }

    const handleDeletePost = (id) => {
        http.delete("posts/" + id).then(res => {
            getPosts();
        });

        showToastMessage("Post Delete Successfully");
    }

    const paginateData = (pageNumber) => {
        setcurrentPage(pageNumber);
        getPosts(pageNumber);
    }


    return (
        <div className='container'>
            <div style={{ float: 'right', margin: '10px' }}>
                <Link className='btn btn-primary' to="/add-post"> Add Post </Link>
            </div>

            <table className="table table-hover table-striped table-bordered table-responsive">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category Name</th>
                        <th scope="col"> Status </th>
                        <th scope="col"> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 && (
                        posts.map((res, index) => (
                            <tr key={index}>
                                {/* {console.log(res)} */}
                                <td>{res.id}</td>
                                <td>{res.title}</td>
                                <td>{res.description}</td>
                                <td>{res.category_name}</td>
                                <td> <label className="switch">
                                    <input type="checkbox" checked={res.is_active == "y" ? "checked" : ""} id={res.custom_id} onChange={handleStatus} />
                                    <span className="slider round"></span>
                                </label> </td>
                                
                                <td> <Link className='btn btn-warning' to={{ pathname: "/edit-post/" + res.custom_id }} > Edit  </Link>
                                    <button className='btn btn-danger' onClick={eve => handleDeletePost(res.custom_id)} > Delete  </button>
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
