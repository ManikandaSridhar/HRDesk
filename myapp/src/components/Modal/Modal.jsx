import React, { useState, useEffect } from 'react';

const EMPTY_FORM = {
  name: '',
  empId: '',
  dept: '',
  role: '',
  email: '',
  phone: '',
  salary: '',
  joindate: '',
  stat: '',
  perf: '',
  manager: '',
  work: '',
};

const Modal = ({ isOpen, onClose, onSave, editEmployee }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErr('');
      if (editEmployee) {
        setForm({
          name: editEmployee.name || '',
          empId: editEmployee.empId || '',
          dept: editEmployee.dept || '',
          role: editEmployee.role || '',
          grade: editEmployee.email || '',
          att: editEmployee.phone || '',
          stat: editEmployee.salary || '',
          phone: editEmployee.joindate || '',
          dob: editEmployee.status || '',
          email: editEmployee.perf || '',
          addr: editEmployee.manager || '',
          work: editEmployee.work || ''
        });
      } else {
        setForm(EMPTY_FORM);
      }
    }
  }, [isOpen, editEmployee]);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = async () => {
    setErr('');
    if (!form.name.trim()) {
      setErr('Employee name is required.');
      return;
    }
    setLoading(true);
    try {
      await onSave(form);
    } catch (e) {
      setErr(e.response?.data?.error || 'Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay open" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">
            ◆ {editEmployee ? 'Edit Employee' : 'Employee Details'}
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">

          {err && <div style={{
            background: '#FCEBEB',
            color: '#A32D2D',
            border: '1px solid #F7C1C1',
            borderRadius: 8,
            padding: '9px 13px',
            fontSize: 12
          }}>{err}</div>}

          <div className="form-row">

            <div className="form-group full">
              <label className="form-label">Full Name *</label>
              <input className="form-input"
                placeholder='Full name'
                value={form.name}
                onChange={handleChange('name')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Employee ID</label>
              <input className="form-input"
                placeholder='EMP-001'
                value={form.empId}
                onChange={handleChange('empId')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-select"
                value={form.dept}
                onChange={handleChange('dept')}>
                <option value="">Select</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>HR</option>
                <option>Operations</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <input className="form-input"
                placeholder='Sr.Developer'
                value={form.role}
                onChange={handleChange('role')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input"
                placeholder='employee@company.com'
                value={form.email}
                onChange={handleChange('email')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input"
                placeholder='+91 XXXXX XXXXX'
                value={form.phone}
                onChange={handleChange('phone')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Monthly Salary</label>
              <input className="form-input"
                placeholder='50000'
                value={form.salary}
                onChange={handleChange('salary')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Join Date</label>
              <input type="date" className="form-input"
                value={form.dob}
                onChange={handleChange('dob')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select"
                value={form.stat}
                onChange={handleChange('stat')}>
                <option>Select</option>
                <option>Active</option>
                <option>On Leave</option>
                <option>Resigned</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Performance</label>
              <select className="form-select"
                value={form.grade}
                onChange={handleChange('grade')}>
                <option value="">Select</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            </div>

          <div className="form-group">
          <label className="form-label">Manager</label>
           <input
              type="text"
              name="manager"
              className="form-input"   
               value={form.manager}
               onChange={(e) =>
              setForm({ ...form, manager: e.target.value })
       }
           placeholder="Manager name"
       />
      </div>

            <div className="form-group">
              <label className="form-label">Work Mode</label>
              <select className="form-select"
                value={form.work}
                onChange={handleChange('work')}>
                <option value="">Select</option>
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>


          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Employee'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;