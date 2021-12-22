import React from "react";

const Filter = ({ newFilter, handleFilterChange }) => (
    <p>filter shown with <input value={newFilter} onChange={handleFilterChange} /></p>
)

export default Filter