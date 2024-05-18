import React, { useState, useEffect } from 'react';

const EmployeePagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / 10)); // Calculate total pages based on 10 entries per page
      } catch (error) {
        console.error('Error fetching data:', error.message);
        alert('Failed to fetch data');
      }
    };

    fetchEmployees();
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const renderEmployees = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = Math.min(startIndex + 10, employees.length);
    const pageEmployees = employees.slice(startIndex, endIndex);

    return (
      <tbody>
        {pageEmployees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.role}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div>
      <h2>Employee Data</h2>
      <table>
        <thead>
          <tr>
            <th><h4>Name</h4></th>
            <th><h4>Email</h4></th>
            <th><h4>Role</h4></th>
          </tr>
        </thead>
        {renderEmployees()}
        <div>
        <button onClick={prevPage} >
         <p>Previous</p>
        </button>
        <span>{currentPage}</span>
        <button onClick={nextPage}>
          <p>Next</p>
        </button>
      </div>
      </table>
     
    </div>
  );
};

export default EmployeePagination;
