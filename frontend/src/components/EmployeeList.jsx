import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import EmployeeListItem from './EmployeeListItem';

function EmployeeList({ employees, onEdit, onDelete }) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 9;

 
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4">
        {currentEmployees.map(employee => (
          <Col key={employee.id}>
            <EmployeeListItem
              employee={employee}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous 
        </Button>

        <span className="fw-light">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline-secondary"
          size="sm"
          
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default EmployeeList;
