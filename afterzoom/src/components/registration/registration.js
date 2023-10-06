import React, { useState } from "react";
import InstructorForm from "./InstructorForm";
import StudentForm from "./StudentForm";

function Registration() {
  const [isInstructor, setIsInstructor] = useState(false);
  const handleInstructorCheckboxChange = () => {
    setIsInstructor(!isInstructor);
  };
  const [isStudent, setIsStudent] = useState(false);
  const handleStudentCheckboxChange = () => {
    setIsStudent(!isStudent);
  };
  const [formData, setFormData] = useState({
    // role: "",
    name: "",
    email: "",
    password: "",
    gender: "",
    language: "",
    age: 21,
    rating: 0,
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
    <div>
      <div className="container-fluid">
        <div className="row main">
          <div className="col-5 qnMan align-self-center">
            
          </div>

          <div className="col-7 align-self-center">
            <h1>TELL ME MORE ABOUT YOURSELF</h1>
            <div>
              <form>
                <label>
                  <input type="checkbox" checked={isInstructor} onChange={handleInstructorCheckboxChange}
                  />
                  I am an instructor
                </label>
                <label>
                  <input type="checkbox" checked={isStudent} onChange={handleStudentCheckboxChange}
                  />
                  I am a student
                </label>
              </form>
              {isInstructor && <InstructorForm />}
              {isStudent && <StudentForm />}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;