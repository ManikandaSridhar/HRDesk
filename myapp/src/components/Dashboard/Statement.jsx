import React from 'react';
import { calcAvgGrade } from '../../utils/helper';

const Statement = ({ employees }) => {
  const list = Array.isArray(employees) ? employees : [];

  const total = list.length;

  const active = list.filter(
    (s) => s?.stat === 'Active' || !s?.stat
  ).length;

  const onleave = list.filter(
    (s) => s?.stat === 'On Leave'
  ).length;

  // ✅ FIXED (dept instead of department)
  const departments = new Set(
    list.map((s) => s.dept)
  ).size;

  // ✅ FIXED (correct function)
  const avgPerf = list.length
    ? calcAvgGrade(list)
    : 0;

  return (
    <div className="stats-row">

      <div className="stat-card">
        <div className="stat-label">Total Staff</div>
        <div className="stat-value" style={{ color: '#0F6E56' }}>
          {total}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Departments</div>
        <div className="stat-value" style={{ color: '#1de2d2' }}>
          {departments}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Active</div>
        <div className="stat-value" style={{ color: '#0e70d1' }}>
          {active}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">On Leave</div>
        <div className="stat-value" style={{ color: '#D85A30' }}>
          {onleave}
        </div>
      </div>

    </div>
  );
};

export default Statement;