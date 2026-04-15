import React from 'react';
import { av, ini, gradeBadge, statusBadge } from '../../utils/helper';
import { useToast } from '../../context/ToastContext';

// 🔹 TABLE UI
const TableUI = ({ employees = [], onEdit, onDelete }) => {
  const { toast } = useToast();

  // EMPTY STATE
  if (!employees.length) {
    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Emp ID</th>
              <th>Department</th>
              <th>Role</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Perf</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="10">
                <div className="empty">
                  <div className="empty-icon">🏢</div>
                  <div>
                    No employees yet. Click "+ Add Employee"!
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // TABLE DATA
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Emp ID</th>
            <th>Department</th>
            <th>Role</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Perf</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((e, i) => {
            const [bg, col] = av(i);

            return (
              <tr key={i}>
                <td>{i + 1}</td>

                <td>
                  <span className="av" style={{ background: bg, color: col }}>
                    {ini(e.name)}
                  </span>
                  <strong>{e.name}</strong>
                </td>

                <td>{e.empId || '—'}</td>
                <td>{e.dept || '—'}</td>
                <td>{e.role || '—'}</td>
                <td>{e.email || '—'}</td>
                <td>{e.salary || '—'}</td>

                <td>
                  <span className={`badge ${statusBadge(e.stat)}`}>
                    {e.stat || 'Active'}
                  </span>
                </td>

                <td>
                  <span className={`badge ${gradeBadge(e.grade)}`}>
                    {e.grade || '—'}
                  </span>
                </td>

                <td>
                  <div className="actions">
                    <button
                      className="ab ab-v"
                      onClick={() => toast(`Employee: ${e.name}`)}
                    >
                      View
                    </button>

                    <button
                      className="ab ab-e"
                      onClick={() => onEdit(e)}
                    >
                      Edit
                    </button>

                    <button
                      className="ab ab-d"
                      onClick={() => onDelete(e)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};


// 🔹 MAIN COMPONENT (IMPORTANT FIX)
const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="page">
      <TableUI
        employees={employees}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default EmployeeTable;