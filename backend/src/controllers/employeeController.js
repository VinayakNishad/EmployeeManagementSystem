import * as employeeService from '../services/employeeService.js';
import Papa from 'papaparse';

export const getEmployees = async (req, res, next) => {
  try {
    const {
      search,
      department,
      designation,
      join_date,
      sort_by,
      sort_order
    } = req.query;

    const options = {
      search,
      department,
      designation,
      join_date,
      sort_by,
      sort_order
    };

    const { employees } = await employeeService.findAll(options);
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};


export const exportEmployees = async (req, res, next) => {
  try {
    const {
      search,
      department,
      designation,
      sort_by = 'name',
      sort_order = 'ASC'
    } = req.query;

    const join_date = req.query.join_date || null;

    const options = {
      search: search || null,
      department: department || null,
      designation: designation || null,
      join_date,
      sort_by,
      sort_order
    };

    const { employees } = await employeeService.findAll(options);

    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found to export.' });
    }

    // ✅ Format join_date to DD-MM-YYYY
    const formattedEmployees = employees.map(emp => ({
      ...emp,
      join_date: emp.join_date
        ? new Date(emp.join_date).toLocaleDateString('en-GB') // e.g., 27/10/2025
        : ''
    }));

    const csv = Papa.unparse(formattedEmployees);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="employees.csv"');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employeeId = parseInt(id);
    if (isNaN(employeeId)) {
      return res.status(400).json({ message: 'Invalid employee ID.' });
    }

    const employee = await employeeService.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const newEmployee = await employeeService.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employeeId = parseInt(id);
    if (isNaN(employeeId)) {
      return res.status(400).json({ message: 'Invalid employee ID.' });
    }

    const updatedEmployee = await employeeService.update(employeeId, req.body);
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const employeeId = parseInt(id);
    if (isNaN(employeeId)) {
      return res.status(400).json({ message: 'Invalid employee ID.' });
    }

    const success = await employeeService.remove(employeeId);
    if (!success) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await employeeService.getAllDepartments();
    res.status(200).json(departments);
  }
  catch (error) {
    next(error);
  }
};
export const getDesignations = async (req, res, next) => {
  try {
    const designations = await employeeService.getAllDesignations();
    res.status(200).json(designations);
  }
  catch (error) {
    next(error);
  }
};


