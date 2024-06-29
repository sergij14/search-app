import { useEffect, useState } from "react";
import { SearchService } from "../core/SearchService";

const useApp = () => {
  const [results, setResults] = useState();
  const [initialData, setInitialData] = useState();
  const [searchService, setSearchService] = useState();
  const fetchData = () => fetch("https://jsonplaceholder.typicode.com/posts");

  const [queryString, setQueryString] = useState("");

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

  useEffect(() => {
    fetchData()
      .then((res) => res.json())
      .then((data) => {
        setSearchService(
          new SearchService(data, { fields: ["title", "body"] })
        );
        setInitialData(data);
      });
  }, []);

  return {
    results: results || initialData,
    setResults,
    initialData,
    searchService,
    queryString,
    setQueryString,
    onSubmit,
  };
};

export default useApp;
