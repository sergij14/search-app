import React from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { SearchService } from "./core/SearchService";

export default function App() {
  const [results, setResults] = React.useState();
  const [initialData, setInitialData] = React.useState();
  const [searchService, setSearchService] = React.useState();
  const fetchData = () => fetch("https://jsonplaceholder.typicode.com/posts");

  React.useEffect(() => {
    fetchData()
      .then((res) => res.json())
      .then((data) => {
        setSearchService(
          new SearchService(data, { fields: ["title", "body"] })
        );
        setInitialData(data);
      });
  }, []);

  return (
    <>
      <SearchForm
        {...{
          setResults,
          initialData,
          searchService,
        }}
      />
      <SearchResults {...{ results: results || initialData }} />
    </>
  );
}
