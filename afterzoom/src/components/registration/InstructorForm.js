import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from "react";

function InstructorForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        language: "",
        age: 21,
        experience: 23,
        type: "auto",
        carModel : "toyota",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:3001/v1/api/instructor/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log("Form data submitted successfully!");
          } else {
            console.error("Error submitting form data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  return (
    <Form>
         <div className="mb-3">
              <input
                type="text"
                name="name"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
                placeholder="name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                className="form-control"
                placeholder="affiliation"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email Address"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
              />
            </div>
            <div id="passwordHelpBlock" className="form-text">
              Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>
            <div className="text-center" style={{ paddingTop: "10px" }}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />{" "}
                Male
              </label>{" "}
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />{" "}
                Female
              </label>
            </div>
            <div style={{ paddingTop: "10px" }}>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="" disabled>
                  Language
                </option>
                <option value="english">English</option>
                <option value="chinese">Chinese</option>
                <option value="tamil">Tamil</option>
                <option value="malay">Malay</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
    </Form>
  );
}

export default InstructorForm;