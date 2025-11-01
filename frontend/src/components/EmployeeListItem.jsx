import React from 'react';
import { Card, Button } from 'react-bootstrap';

function EmployeeListItem({ employee, onEdit, onDelete }) {
 
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-start">
          <div className="flex-grow-1">
            <Card.Title className="mb-1">{employee.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-primary">{employee.designation}</Card.Subtitle>
            <Card.Text className="text-muted small">{employee.email}</Card.Text>
          </div>
          <div className="ms-3">
            <span className="badge bg-success d-flex justify-content-center p-2">
              {employee.department}
            </span>
            <div className="mt-2 small text-muted">
              Joined: {formatDate(employee.join_date)}
            </div>
          </div>
        </div>
      </Card.Body>

      <Card.Footer className="bg-light d-flex justify-content-end gap-2">
        <Button variant="outline-primary" size="sm" onClick={() => onEdit(employee)}>
          Edit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={() => onDelete(employee.id)}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default EmployeeListItem;
