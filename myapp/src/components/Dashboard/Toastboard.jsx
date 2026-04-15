import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

import Toolbar from './Toolbar';
import Statement from '../Dashboard/Statement';
import Modal from '../Modal/Modal';
import ProfilePanel from '../Panels/ProfilePanel';
import SettingsPanel from '../Panels/SettingsPanel';
import Header from '../Header/Header';
import EmployeeTable from './EmployeeTable';

const Toastboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // 🔥 MAIN STATE
  const [allEmployees, setAllEmployees] = useState([]);

  const [search, setSearch] = useState('');
  const [filterCls, setFilterCls] = useState('');
  const [filterStat, setFilterStat] = useState('');
  const [activeTab, setActiveTab] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 🔥 OPEN MODAL
  const handleOpenModal = (employee = null) => {
    setEditEmployee(employee);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditEmployee(null);
  };

  // 🔥 SAVE EMPLOYEE
  const handleSaveEmployee = (formData) => {
    if (editEmployee) {
      // UPDATE
      setAllEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editEmployee.id ? { ...emp, ...formData } : emp
        )
      );
      toast('Employee updated! ✓');
    } else {
      // ADD
      const newEmployee = {
        ...formData,
        id: Date.now(),
      };

      setAllEmployees((prev) => [...prev, newEmployee]);
      toast('Employee added! ✓');
    }

    handleCloseModal();
  };

  // 🔥 DELETE
  const handleDeleteEmployee = (employee) => {
    if (!window.confirm(`Remove ${employee.name}?`)) return;

    setAllEmployees((prev) =>
      prev.filter((e) => e.id !== employee.id)
    );

    toast('Employee removed!');
  };

  const filteredEmployees = allEmployees.filter((emp) => {
  const matchSearch =
    emp.name?.toLowerCase().includes(search.toLowerCase());

  const matchDept =
    !filterCls ||
    emp.dept?.toLowerCase().trim() === filterCls.toLowerCase().trim();

  const matchStatus =
    !filterStat ||
    emp.stat?.toLowerCase().trim() === filterStat.toLowerCase().trim();

  return matchSearch && matchDept && matchStatus;
});

  return (
    <>
      <Header
        onEnrollEmployee={() => handleOpenModal()}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div className="container">

        {/* STATS */}
        <Statement employees={allEmployees} />

        {/* FILTER */}
        <Toolbar
          search={search}
          onSearch={setSearch}
          filterCls={filterCls}
          onFilterCls={setFilterCls}
          filterStat={filterStat}
          onFilterStat={(v) => {
            setFilterStat(v);
            setActiveTab(v || '');
          }}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* TABLE */}
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleOpenModal}
          onDelete={handleDeleteEmployee}
        />

      </div>

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEmployee}
        editEmployee={editEmployee}
      />

      <ProfilePanel
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default Toastboard;