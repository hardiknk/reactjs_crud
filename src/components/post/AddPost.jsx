import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import http from '../../http';

export default function AddPost() {

    const navigate = useNavigate();

    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const [categories, setCategories] = useState([]);

    const [inputs, setInputs] = useState({
        'title': '',
        'description': '',
        'name': '',
        'category_id' : ''
    });

    const handleChange = (eve) => {
        const name = eve.target.name;
        const value = eve.target.value;
        // console.log(value);
        setInputs(values => ({ ...values, [name]: value }));
    }

    const submitPostForm = (eve) => {
        http.post("posts", inputs).then((res) => {
            showToastMessage("Posts Added Successfully");
            navigate('/post', { replace: true });
        });
    }

    useEffect(() => {
        getAllCategory();
    }, [])


    const getAllCategory = async () => {
        await http.get("/all-category").then((res) => {
            setCategories(res.data.data);
        });
    }

    return (
        <div className='container' style={{ marginTop: "20px" }}>
            <h2> Add Post </h2>
            <div className="form-group">
                <label htmlFor="title"> Title </label>
                <input type="text" className="form-control" value={inputs.title || ''} onChange={handleChange} name="title" id="title" placeholder="Enter Post Title" />
            </div>

            <div className="form-group">
                <label htmlFor="name"> Author Name </label>
                <input type="text" className="form-control" value={inputs.name || ''} onChange={handleChange} name="name" id="name" placeholder="Post Author Name" />
            </div>

            <div className="form-group">
                <label htmlFor="description"> Description </label>
                <input type="text" className="form-control" value={inputs.description || ''} onChange={handleChange} name="description" id="description" placeholder="Enter Post Description" />
            </div>

            <div className="form-group">
                <select className="form-select form-control" name='category_id' onChange={handleChange} >
                    <option > Select Category</option>
                    {categories.length > 0 && (categories.map((category, index) => (<option value={category.id} key={index}> {category.title} </option>))
                    )}

                </select>
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

            <button type="submit" className="btn btn-primary" onClick={submitPostForm} >Submit</button>
        </div>
    )
}
