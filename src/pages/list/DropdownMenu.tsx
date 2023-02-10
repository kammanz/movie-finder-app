import React from 'react';

const DropdownMenu = () => {
  const handleChange = (e: any) => {
    console.log('e.target.value: ', e.target.value);
  };

  return (
    <form>
      <label htmlFor="sort-movies">Sort by:</label>
      <select id="sort-movies" onChange={(e) => handleChange(e)}>
        <option value="newest">newest</option>
        <option value="oldest">oldest</option>
        <option value="thirty days">last 30 days</option>
      </select>
    </form>
  );
};

export default DropdownMenu;
