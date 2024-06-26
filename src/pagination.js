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
            <td><h3>{employee.name}</h3></td>
            <td><h3>{employee.email}</h3></td>
            <td><h3>{employee.role}</h3></td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div>
      <h1>Employee Data</h1>
      <table>
        <thead>
          <tr>
            <th><h2>Name</h2></th>
            <th><h2>Email</h2></th>
            <th><h2>Role</h2></th>
          </tr>
        </thead>
        {renderEmployees()}
        <div>
        <button type='button' onClick={prevPage} >
         Previous
        </button>
        <div>{currentPage}</div>
        <button type='button' onClick={nextPage}>
          Next
        </button>
      </div>
      </table>
     
    </div>
  );
};

export default EmployeePagination;
