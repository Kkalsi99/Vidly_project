import React from "react";
const Search = ({ value, onChange }) => {
  return (
    <input
      className="form-control my-3"
      name="search"
      type="text"
      placeholder="Search....."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Search;
