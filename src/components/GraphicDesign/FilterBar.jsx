import React, { useState, useEffect, useRef } from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, categories, onFilterChange, activeFiltersCount, totalResults }) => {
  const [searchValue, setSearchValue] = useState(filters.q || '');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const debounceTimer = useRef(null);
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onFilterChange({ q: value, page: 1 });
    }, 300);
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ category, page: 1 });
    setShowCategoryDropdown(false);
  };

  const handleSortChange = (sort) => {
    onFilterChange({ sort, page: 1 });
    setShowSortDropdown(false);
  };

  const clearFilters = () => {
    setSearchValue('');
    onFilterChange({ category: '', q: '', sort: 'newest', page: 1 });
  };

  const removeFilter = (filterType) => {
    if (filterType === 'search') {
      setSearchValue('');
      onFilterChange({ q: '', page: 1 });
    } else if (filterType === 'category') {
      onFilterChange({ category: '', page: 1 });
    } else if (filterType === 'sort') {
      onFilterChange({ sort: 'newest', page: 1 });
    }
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'az', label: 'A-Z' }
  ];

  const currentSort = sortOptions.find(opt => opt.value === filters.sort) || sortOptions[0];

  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <div className="search-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search projects..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue && (
            <button
              className="clear-search"
              onClick={() => {
                setSearchValue('');
                onFilterChange({ q: '', page: 1 });
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="dropdown-wrapper" ref={categoryRef}>
          <button
            className={`filter-dropdown ${filters.category ? 'active' : ''}`}
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <i className="fas fa-folder"></i>
            {filters.category || 'All Categories'}
            <i className={`fas fa-chevron-down dropdown-arrow ${showCategoryDropdown ? 'open' : ''}`}></i>
          </button>
          {showCategoryDropdown && (
            <div className="dropdown-menu">
              <button
                className={`dropdown-item ${!filters.category ? 'selected' : ''}`}
                onClick={() => handleCategoryChange('')}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`dropdown-item ${filters.category === category ? 'selected' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-wrapper" ref={sortRef}>
          <button
            className="filter-dropdown"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <i className="fas fa-sort"></i>
            {currentSort.label}
            <i className={`fas fa-chevron-down dropdown-arrow ${showSortDropdown ? 'open' : ''}`}></i>
          </button>
          {showSortDropdown && (
            <div className="dropdown-menu">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`dropdown-item ${filters.sort === option.value ? 'selected' : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button className="clear-all-btn" onClick={clearFilters}>
            <i className="fas fa-times-circle"></i>
            Clear All
          </button>
        )}
      </div>

      <div className="filter-summary">
        <span className="results-count">
          {totalResults} {totalResults === 1 ? 'project' : 'projects'} found
        </span>

        {(filters.q || filters.category || filters.sort !== 'newest') && (
          <div className="active-filters">
            {filters.q && (
              <span className="filter-chip">
                Search: "{filters.q}"
                <button onClick={() => removeFilter('search')}>
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
            {filters.category && (
              <span className="filter-chip">
                {filters.category}
                <button onClick={() => removeFilter('category')}>
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
            {filters.sort !== 'newest' && (
              <span className="filter-chip">
                Sort: {currentSort.label}
                <button onClick={() => removeFilter('sort')}>
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
