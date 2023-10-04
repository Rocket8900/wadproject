import React, { useState } from "react";

function Registration() {
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    password: "",
    gender: "",
    language: "",
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
      const response = await fetch("localhost:3001/v1/api/XXX/YYY", {
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
    <div>
      <div className="container-fluid">
        <div className="row main">
          <div className="col-5 qnMan align-self-center">
            <img src="questionMarkMan.jpg" alt="Question Mark Man" />
          </div>

          <div className="col-7 align-self-center">
            <h1>TELL ME MORE ABOUT YOURSELF</h1>
            <div className="text-center m-3" style={{ paddingTop: "10px" }}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="learner"
                  onChange={handleChange}
                />{" "}
                Learner
              </label>{" "}
              <label>
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  onChange={handleChange}
                />{" "}
                Instructor
              </label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Name"
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
            <div>
              <a href="" className="arrow pt-5">
                <img src="right-arrow-50.png" alt="Right Arrow" />
              </a>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;