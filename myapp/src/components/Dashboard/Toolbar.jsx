import React from 'react';

const Toolbar = ({
  search,
  onSearch,
  filterCls,
  onFilterCls,
  filterStat,
  onFilterStat,
}) => {
  return (
    <div className="toolbar">

      {/* 🔍 Search */}
      <input
        className="search-input"
        placeholder="🔍 Search employees..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* 📂 Department Filter */}
      <select
        className="filter-select"
        value={filterCls}
        onChange={(e) => onFilterCls(e.target.value)}
      >
        <option value="">All Department</option>
        <option>Engineering</option>
        <option>Design</option>
        <option>Marketing</option>
        <option>Finance</option>
        <option>HR</option>
        <option>Operations</option>
      </select>

      {/* 📊 Status Filter */}
      <select
        className="filter-select"
        value={filterStat}
        onChange={(e) => onFilterStat(e.target.value)}
      >
        <option value="">All Status</option>
  <option value="Active">Active</option>
  <option value="On Leave">On Leave</option>
  <option value="Resigned">Resigned</option>
</select>

    </div>
  );
};

export default Toolbar;