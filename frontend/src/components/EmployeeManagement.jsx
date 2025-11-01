import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import EmployeeList from './EmployeeList';
import EmployeeSearch from './EmployeeSearch';
import EmployeeForm from './EmployeeForm';
import { toast } from 'react-toastify';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    designation: '',
    join_date: '',
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await axios.get(`http://localhost:3001/api/employees?${params.toString()}`);
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to fetch employee data!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [filters]); 

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ search: '', department: '', designation: '', join_date: '' });
  };

  /** Add or edit employee */
  const handleSaveEmployee = async (formData) => {
    try {
      if (editingEmployee) {
        await axios.put(`http://localhost:3001/api/employees/${editingEmployee.id}`, formData);
        toast.success('Employee updated successfully!');
      } else {
        await axios.post('http://localhost:3001/api/employees', formData);
        toast.success('Employee added successfully!');
      }

      handleCloseModal();
      fetchEmployees(); 
    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error('Failed to save employee!');
    }
  };

  
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${deleteConfirmId}`);
      toast.success('Employee deleted successfully!');
      setDeleteConfirmId(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error(' Failed to delete employee!');
    }
  };

  const handleOpenModal = (employee = null) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  return (
    <div className="container py-4">
    
      <EmployeeSearch
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onAddNew={() => handleOpenModal(null)}
      />

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : employees.length > 0 ? (
        <EmployeeList
          employees={employees}
          onEdit={handleOpenModal}
          onDelete={(id) => setDeleteConfirmId(id)}
        />
      ) : (
      <Alert variant="info" className="mt-4 text-center">
        No employees found. Try adjusting your filters.
      </Alert>
      )}

      
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeForm
            employee={editingEmployee}
            onSave={handleSaveEmployee}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>

     
      <Modal show={deleteConfirmId !== null} onHide={() => setDeleteConfirmId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this employee? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmployeeManagement;
