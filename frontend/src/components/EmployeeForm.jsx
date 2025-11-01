import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {allDepartments, allDesignations} from '../data/MockData';

function EmployeeForm({ employee, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    join_date: '',
  });

  useEffect(() => {
    if (employee) {
      const formattedDate = employee.join_date
        ? new Date(employee.join_date).toISOString().split('T')[0]
        : '';
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || '',
        designation: employee.designation || '',
        join_date: formattedDate || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        department: '',
        designation: '',
        join_date: '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = { ...formData, id: employee ? employee.id : Date.now() };

    try {
      const response = await fetch(
        employee
          ? `http://localhost:3001/api/employees/${employee.id}`
          : 'http://localhost:3001/api/employees',
        {
          method: employee ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save employee');
      }

      const result = await response.json();

      toast.success('Employee saved successfully!');
      onSave(result);
      onCancel();

    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error('Failed to save employee data!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-4">
        <Form.Group as={Col} controlId="formEmployeeName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formEmployeeEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formEmployeeDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Choose...</option>
            {allDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formEmployeeDesignation">
          <Form.Label>Designation</Form.Label>
          <Form.Select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Choose...</option>
            {allDesignations.map(desg => (
              <option key={desg} value={desg}>{desg}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formEmployeeJoiningDate">
          <Form.Label>Joining Date</Form.Label>
          <Form.Control
            type="date"
            name="join_date"
            value={formData.join_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="outline-secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" type="submit">Save Changes</Button>
      </div>
    </Form>
  );
}

export default EmployeeForm;
