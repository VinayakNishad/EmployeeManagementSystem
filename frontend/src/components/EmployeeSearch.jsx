import React, { useEffect, useState } from 'react';
import { Row, Col, InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';

function EmployeeSearch({ filters, onFilterChange, onClearFilters, onAddNew }) {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleDownloadCSV = async () => {
    try {
      const params = {};

      if (filters.search) params.search = filters.search;
      if (filters.department) params.department = filters.department;
      if (filters.designation) params.designation = filters.designation;
      if (filters.join_date) params.join_date = filters.join_date;

      const res = await axios.get('http://localhost:3001/api/employees/export', {
        params,
        responseType: 'blob', // important for binary data
      });

      // ✅ Create a blob link and trigger the download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'employees.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error('Error downloading CSV:', err);
      alert('Failed to download CSV file.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, desgRes] = await Promise.all([
          axios.get('http://localhost:3001/api/employees/departments'),
          axios.get('http://localhost:3001/api/employees/designations'),
        ]);

        setDepartments(Array.isArray(deptRes.data) ? deptRes.data : []);
        setDesignations(Array.isArray(desgRes.data) ? desgRes.data : []);
      } catch (error) {
        console.error('Error fetching departments/designations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-sm border">
      <Row className="gy-3">
        <Col lg={6}>
          <h2 className="mb-4"><strong>Employee Management System</strong></h2>
        </Col>
        <Col lg={6}>
          <InputGroup>
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md={6} lg={3}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <Form.Select
              value={filters.department}
              className="text-muted"
              onChange={(e) => onFilterChange('department', e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </Form.Select>
          )}
        </Col>

        <Col md={6} lg={3}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <Form.Select
              value={filters.designation}
              className="text-muted"
              onChange={(e) => onFilterChange('designation', e.target.value)}
            >
              <option value="">All Designations</option>
              {designations.map((desg) => (
                <option key={desg} value={desg}>{desg}</option>
              ))}
            </Form.Select>
          )}
        </Col>

        <Col md={6} lg={3}>
          <Form.Control
            type="date"
            value={filters.join_date}
            onChange={(e) => onFilterChange('join_date', e.target.value)}
            className="text-muted"
          />
        </Col>

        <Col md={6} lg={3} className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            onClick={onClearFilters}
            className="flex-grow-1 text-nowrap"
          >
            Clear
          </Button>
          <Button
            variant="outline-primary"
            onClick={onAddNew}
            className="flex-grow-1 text-nowrap"
          >
            Add New
          </Button>
          <Button variant="success" onClick={handleDownloadCSV} className="flex-grow-1 text-nowrap">
            Download CSV
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default EmployeeSearch;
