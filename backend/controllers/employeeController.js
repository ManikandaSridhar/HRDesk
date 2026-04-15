const mongoose = require('mongoose');
const Employee = require('../models/Employee');

// Demo in-memory store
const demoEmployees = [];

const isDemoUser = (req) => req.user.id === 'demo';

// GET /api/employees
const getEmployees = async (req, res) => {
  try {
    if (isDemoUser(req)) {
      let results = [...demoEmployees];
      const { search, dept, stat } = req.query;

      if (search) {
        const s = search.toLowerCase();
        results = results.filter(
          (x) =>
            x.name.toLowerCase().includes(s) ||
            (x.empId || '').toLowerCase().includes(s)
        );
      }

      if (dept) results = results.filter((x) => x.dept === dept);
      if (stat) results = results.filter((x) => x.stat === stat);

      return res.json(results);
    }

    const query = { userId: req.user.id };
    const { search, dept, stat } = req.query;

    if (dept) query.dept = dept;
    if (stat) query.stat = stat;

    let employees = await Employee.find(query).sort({ createdAt: -1 });

    if (search) {
      const s = search.toLowerCase();
      employees = employees.filter(
        (x) =>
          x.name.toLowerCase().includes(s) ||
          (x.empId || '').toLowerCase().includes(s)
      );
    }

    res.json(employees.map((e) => e.toJSON()));
  } catch (err) {
    console.error('getEmployees error:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// POST /api/employees
const createEmployee = async (req, res) => {
  try {
    const {
      name,
      empId,
      dept,
      role,
      grade,
      att,
      stat,
      phone,
      dob,
      email,
      addr,
      salary,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Employee name is required' });
    }

    const employeeData = {
      name: name.trim(),
      empId: empId || '',
      dept: dept || 'HR',
      role: role || '',
      grade: grade || 'A',
      att: att || '',
      stat: stat || 'Active',
      phone: phone || '',
      dob: dob || '',
      email: email || '',
      addr: addr || '',
      salary: salary || '',
    };

    if (isDemoUser(req)) {
      const demoEmployee = {
        id: `demo-${Date.now()}`,
        userId: 'demo',
        ...employeeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      demoEmployees.unshift(demoEmployee);
      return res.status(201).json(demoEmployee);
    }

    const employee = await Employee.create({
      userId: req.user.id,
      ...employeeData,
    });

    res.status(201).json(employee.toJSON());
  } catch (err) {
    console.error('createEmployee error:', err);
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors)[0].message;
      return res.status(400).json({ error: msg });
    }
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

// PUT /api/employees/:id
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      empId,
      dept,
      role,
      grade,
      att,
      stat,
      phone,
      dob,
      email,
      addr,
      salary,
    } = req.body;

    const updateData = {
      name: (name || '').trim() || 'Unknown Employee',
      empId: empId || '',
      dept: dept || 'HR',
      role: role || '',
      grade: grade || 'A',
      att: att || '',
      stat: stat || 'Active',
      phone: phone || '',
      dob: dob || '',
      email: email || '',
      addr: addr || '',
      salary: salary || '',
    };

    if (isDemoUser(req)) {
      const idx = demoEmployees.findIndex((e) => e.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Employee not found' });

      demoEmployees[idx] = {
        ...demoEmployees[idx],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      return res.json(demoEmployees[idx]);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const updated = await Employee.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Employee not found' });

    res.json(updated.toJSON());
  } catch (err) {
    console.error('updateEmployee error:', err);
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors)[0].message;
      return res.status(400).json({ error: msg });
    }
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

// DELETE /api/employees/:id
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDemoUser(req)) {
      const idx = demoEmployees.findIndex((e) => e.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Employee not found' });

      demoEmployees.splice(idx, 1);
      return res.json({ message: 'Employee removed successfully' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const deleted = await Employee.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ error: 'Employee not found' });

    res.json({ message: 'Employee removed successfully' });
  } catch (err) {
    console.error('deleteEmployee error:', err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};