import React, { useState } from "react";

export default function SearchForm({ queryString, setQueryString, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={queryString}
        onChange={({ target }) => setQueryString(target.value)}
        type="text"
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
