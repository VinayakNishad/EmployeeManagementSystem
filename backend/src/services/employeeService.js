import pool from '../config/db.js';


export const findAll = async (options = {}) => {
  const {
    search = null,
    department = null,
    designation = null,
    join_date = null,
    sort_by = 'name',
    sort_order = 'ASC',
  } = options;

  let query = 'SELECT * FROM employees WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (name LIKE ? OR email LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (department) {
    query += ' AND department = ?';
    params.push(department);
  }

  if (designation) {
    query += ' AND designation = ?';
    params.push(designation);
  }


  if (join_date) {
    query += ' AND DATE(join_date) = ?';
    params.push(join_date);
  }


  const validSortFields = ['name', 'email', 'department', 'designation', 'join_date'];
  const sortField = validSortFields.includes(sort_by) ? sort_by : 'name';
  const sortDirection = sort_order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  query += ` ORDER BY ${sortField} ${sortDirection}`;

  const [rows] = await pool.query(query, params);
  return { employees: rows };
};



export async function findById(id) {
    const [rows] = await pool.execute("SELECT * FROM employees WHERE id = ?", [id]);
    return rows[0] || null;
}

export async function create(employeeData) {
    const { name, email, department, designation, join_date } = employeeData;
    const [result] = await pool.execute(
        "INSERT INTO employees (name, email, department, designation, join_date) VALUES (?, ?, ?, ?, ?)",
        [name, email, department, designation, join_date]
    );
    return { id: result.insertId, ...employeeData };
}

export async function update(id, employeeData) {
    const { name, email, department, designation, join_date } = employeeData;
    const [result] = await pool.execute(
        "UPDATE employees SET name = ?, email = ?, department = ?, designation = ?, join_date = ? WHERE id = ?",
        [name, email, department, designation, join_date, id]
    );

    if (result.affectedRows === 0) {
        return null; 
    }
    return { id: id, ...employeeData };
}

export async function remove(id) {
    const [result] = await pool.execute("DELETE FROM employees WHERE id = ?", [id]);
    return result.affectedRows > 0;
}


export async function getAllDepartments() {
    const [rows] = await pool.execute("SELECT DISTINCT department FROM employees");
    return rows.map(row => row.department);
}
export async function getAllDesignations() {
    const [rows] = await pool.execute("SELECT DISTINCT designation FROM employees");
    return rows.map(row => row.designation);
}