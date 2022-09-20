import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../http'
import { toast } from 'react-toastify';

export default function AddCategory() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        'title': '',
        'description': '',
    });

    const handleChange = (eve) => {
        const name = eve.target.name;
        const value = eve.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const submitCategoryForm = () => {
        http.post("/category", inputs).then((res) => {
            showToastMessage("Category Added Successfully");
            navigate('/category', { replace: true });
        });
    }

    return (
        <div className='container' style={{ marginTop: "20px" }}>

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
                    <input className="form-check-input" type="radio" name="is_active" onChange={handleChange} id="inlineRadio1" value="y" />
                    <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="is_active" id="inlineRadio2" onChange={handleChange} value="n" />
                    <label className="form-check-label" htmlFor="inlineRadio2">In Active</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={submitCategoryForm} >Submit</button>

        </div>
    )
}
