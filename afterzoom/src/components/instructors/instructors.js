import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import "./styles/card.css";

// function for setting background image
const backgroundImageStyle = (urls) => {
  if (Array.isArray(urls) && urls.length > 0) {
    return {
      backgroundImage: `url(${urls[0]})`,
    };
  } else {
    return {};
  }
};

// component for creating Instructor Card
function InstructorCard({ instructor }) {
  return (
    <div className="card" style={backgroundImageStyle(instructor.picture)}>
      <div className="content">
        <h2 className="title">{instructor.name}</h2>
        <p className="copy">Instructor for {instructor.experience} years</p>
        <Link to={`/instructors/${instructor.id}`}>
          <button className="btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}

function InstructorsComponent() {
  const [instructors, setInstructors] = useState([]);
  const [filter, setFilter] = useState({
    gender: [],
    affiliation: [],
    type: []
  });

  useEffect(() => {
    const getInstructorsData = async () => {
      try {
        const token = Cookie.get('access_token');

        const response = await axios.get("http://localhost:3001/v1/api/instructor/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInstructors(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getInstructorsData();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;

    setFilter(prevFilter => {
      const updatedFilter = { ...prevFilter };

      if (checked) {
        updatedFilter[name] = [...updatedFilter[name], value];
      } else {
        updatedFilter[name] = updatedFilter[name].filter(item => item !== value);
      }

      return updatedFilter;
    });
  };

  const filteredInstructors = instructors.filter((instructor) => {
    return (
      (filter.gender.length === 0 || filter.gender.includes(instructor.gender)) &&
      (filter.affiliation.length === 0 || filter.affiliation.includes(instructor.affiliation)) &&
      (filter.type.length === 0 || filter.type.includes(instructor.type))
    );
  });

  return (
    <div>
      <div className="header">
        <h1>INSTRUCTORS</h1>
        <Link to={`/student-dashboard`} className='dashboardLink'>
          <span >Dashboard</span>
        </Link>
      </div>
        <div className="inline">
      
          <form style={{ marginBottom: '1rem' }}>
            <div>
              <h4>Gender:</h4>
              <label>
                <input
                  type="checkbox"
                  name="gender"
                  value="Male"
                  checked={filter.gender.includes('Male')}
                  onChange={handleCheckboxChange}
                /> Male
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="gender"
                  value="Female"
                  checked={filter.gender.includes('Female')}
                  onChange={handleCheckboxChange}
                /> Female
              </label>
            </div>
            <br />
            <div>
              <h4>Affiliation:</h4>
              <label>
                <input
                  type="checkbox"
                  name="affiliation"
                  value="BBDC"
                  checked={filter.affiliation.includes('BBDC')}
                  onChange={handleCheckboxChange}
                /> BBDC
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="affiliation"
                  value="SSDC"
                  checked={filter.affiliation.includes('SSDC')}
                  onChange={handleCheckboxChange}
                /> SSDC
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="affiliation"
                  value="CDC"
                  checked={filter.affiliation.includes('CDC')}
                  onChange={handleCheckboxChange}
                /> CDC
              </label>
            </div>
            <br/>
            <div>
              <h4>Transmission:</h4>
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value="auto"
                  checked={filter.type.includes('auto')}
                  onChange={handleCheckboxChange}
                /> Auto
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value="manual"
                  checked={filter.type.includes('manual')}
                  onChange={handleCheckboxChange}
                /> manual
              </label>
            </div>
            
          </form>

          {/* Render InstructorCard component for each filtered instructor */}
          <main className="page-content">
            {filteredInstructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </main>
        </div>
    </div>
  );
}

export default InstructorsComponent;