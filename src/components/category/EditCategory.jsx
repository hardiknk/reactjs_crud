import React, { useState } from 'react'
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import http from '../../http';

export default function EditCategory(props) {

    const [inputs, setInputs] = useState({});
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    // const { id } = usersParameter();
    const { id } = useParams();

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleChange = (eve) => {
        const name = eve.target.name;
        const value = eve.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const fetchCategory = () => {
        http.get("/category/" + id + '/edit').then((res) => {
            setInputs({
                title: res.data.title,
                description: res.data.description,
                is_active: res.data.is_active,
            });
        });
    }

    const submitUpdateCategory = () => {
        http.put("/category/" + id, inputs).then((res) => {
            navigate('/category', { replace: true });
        });
    }

    return (
        <div className='container' style={{ marginTop: "20px" }}>

            <h1>Update Category</h1>

            <div className="form-group">
                <label htmlFor="title"> Title </label>
                <input type="text" className="form-control" value={inputs.title || ''} onChange={handleChange} name="title" id="title" placeholder="Enter Category Name" />
            </div>

            <div className="form-group">
                <label htmlFor="description"> Description </label>
                <input type="text" className="form-control" value={inputs.description || ''} onChange={handleChange} name="description" id="description" placeholder="Enter Category Description" />
            </div>

            <div className="form-group">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="is_active" checked={inputs.is_active === 'y'} onChange={handleChange} id="inlineRadio1" value="y" />
                    <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="is_active" checked={inputs.is_active === 'n'} id="inlineRadio2" onChange={handleChange} value="n" />
                    <label className="form-check-label" htmlFor="inlineRadio2">In Active</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={submitUpdateCategory} >Update</button>

        </div>
    )
}
