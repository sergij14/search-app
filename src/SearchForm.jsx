import React from "react";

export default function SearchForm({ setResults, initialData, searchService }) {
  const [queryString, setQueryString] = React.useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!queryString.length) {
      return setResults(undefined);
    }

    const searchResults = searchService.search(queryString);
    setResults(
      searchResults.map(({ index, metadata: { preview } }) => ({
        ...initialData[index],
        preview,
      }))
    );
    return;
  };

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
