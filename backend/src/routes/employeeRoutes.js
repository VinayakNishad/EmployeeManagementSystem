import express from 'express';
import * as employeeController from '../controllers/employeeController.js';

const router = express.Router();

// --- Main Employee Routes ---
router.get('/', employeeController.getEmployees);
router.get('/export', employeeController.exportEmployees);

// ✅ Define these before "/:id"
router.get('/departments', employeeController.getDepartments);
router.get('/designations', employeeController.getDesignations);

// --- Standard CRUD Routes ---
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

export default router;
