import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
function InstructorsComponent() {
    const [instructors, setInstructors] = useState([]);
    const [filter, setFilter] = useState({
        gender: '',
      });
  
    useEffect(() => {
      const getInstructorsData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/v1/api/instructor/list");
          setInstructors(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      getInstructorsData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({
          ...filter,
          [name]: value,
        });
      };

    const filteredInstructors = instructors.filter((instructor) => {
        return (
        (filter.gender === '' || instructor.gender === filter.gender)
        );
    });
    return (
      <div>
        <form>
            <label>
            Gender:
            <select
                name="gender"
                value={filter.gender}
                onChange={handleFilterChange}
            >
                <option value="">All</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
            </select>
            </label>
        </form>
        {filteredInstructors.map((instructor) => (
            <Card key={instructor.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{instructor.name}</Card.Title>
                    <Card.Text>
                    Driver for {instructor.experience} years 
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        ))}
      </div>
    );
  }
  
  export default InstructorsComponent;



