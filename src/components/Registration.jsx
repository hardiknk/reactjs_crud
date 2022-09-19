import React, { useState } from 'react';

export default function Registration() {

    const [UserRegistration, setUserRegistration] = useState({
        name: "",
        email: "",
        position: "",
        password: "",
        gender: "",
        'error_list': []
    })

    //error handling state 
    const [errors, setErrors] = useState({
        'errName': "",
        'errEmail': "",
        'errPosition': "",
        'errPassword': "",
        'errGender': "",
    });


    const validateFormData = () => {
        const errors = {};
        if (UserRegistration.name === '') { errors.errName = "name field is not blank" }
        setErrors(errors);
        setUserRegistration({ ...UserRegistration, errors: errors });
        return Object.keys(errors).length === 0 ? null : errors;

    }

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserRegistration({ ...UserRegistration, [name]: value });
    }

    const [records, setRecords] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // alert("hiiii");
        // validateFormData();
        if (validateFormData() == null) {
            console.log("form name validation success");
        }
        else {
            console.log("validation is not success");
        }

        const newRecords = { ...UserRegistration, id: new Date().getTime().toString() };
        setRecords([...records, newRecords]);
        setUserRegistration({ name: "", email: "", position: "", password: '', gender: '' });

    }

    return (
        <div className='container'>
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Register Form</h3>
                                <p>Fill in the data below.</p>
                                <form onSubmit={handleSubmit} className="requires-validation" method='POST' encType='multipart/form-data' noValidate>

                                    <div className="col-md-12">
                                        <input className="form-control" value={UserRegistration.name} onChange={handleInput} type="text" name="name" placeholder="Full Name" required />
                                        {errors.errName ? errors.errName : ""}
                                        {/* {errors.errEmail && <p className="invalid-feedback"> { errors.errEmail } </p>} */}
                                        <div className="invalid-feedback">{errors.errName ? errors.errName : ""}</div>

                                    </div>

                                    <div className="col-md-12">
                                        <input className="form-control" value={UserRegistration.email} onChange={handleInput} type="email" name="email" placeholder="E-mail Address" required />
                                        <div className="valid-feedback">Email field is valid!</div>
                                        <div className="invalid-feedback">Email field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-12">
                                        <select className="form-select mt-3" name='position' onChange={handleInput} value={UserRegistration.position} required>
                                            <option disabled >Position</option>
                                            <option value="jweb">Junior Web Developer</option>
                                            <option value="sweb">Senior Web Developer</option>
                                            <option value="pmanager">Project Manager</option>
                                        </select>
                                        <div className="valid-feedback">You selected a position!</div>
                                        <div className="invalid-feedback">Please select a position!</div>
                                    </div>

                                    <div className="col-md-12">
                                        <input className="form-control" value={UserRegistration.password} onChange={handleInput} type="password" name="password" placeholder="Password" required />
                                        <div className="valid-feedback">Password field is valid!</div>
                                        <div className="invalid-feedback">Password field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-12 mt-3">
                                        <label className="mb-3 mr-1" htmlFor="gender">Gender: </label>
                                        <input type="radio" className="btn-check" name="gender" value="1" onChange={handleInput} id="male" autoComplete="off" required />
                                        <label className="btn btn-sm btn-outline-secondary" htmlFor="male">Male</label>

                                        <input type="radio" className="btn-check" name="gender" id="female" onChange={handleInput} value="2" autoComplete="off" required />
                                        <label className="btn btn-sm btn-outline-secondary" htmlFor="female">Female</label>

                                        <input type="radio" className="btn-check" name="gender" id="secret" onChange={handleInput} value="3" autoComplete="off" required />

                                        {/* <label className="btn btn-sm btn-outline-secondary" htmlFor="secret">Secret</label>
                                        <div className="valid-feedback mv-up">You selected a gender!</div>
                                        <div className="invalid-feedback mv-up">Please select a gender!</div> */}
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="invalidCheck" required />
                                        <label className="form-check-label">I confirm that all data are correct</label>
                                        <div className="invalid-feedback">Please confirm that the entered data are all correct!</div>
                                    </div>

                                    <div className="form-button mt-3">
                                        <button id="submit" type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                                <div>
                                    {/* {
                                        records.map((currentEle) => {
                                            return (
                                                <div style={showDataStyle}>
                                                    <p> {currentEle.name} </p>
                                                    <p> {currentEle.email} </p>
                                                    <p> {currentEle.position} </p>
                                                    <p> {currentEle.gender} </p>
                                                </div>
                                            );
                                        })
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
