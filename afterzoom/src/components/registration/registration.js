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