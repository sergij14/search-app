import { useEffect, useState } from "react";
import { SearchService } from "../core/SearchService";

const useApp = () => {
  const [results, setResults] = useState();
  const [initialData, setInitialData] = useState();
  const [searchService, setSearchService] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [queryString, setQueryString] = useState("");
  const fetchData = () => fetch("https://jsonplaceholder.typicode.com/posts");

  const onSearch = (term) => {
    setSuggestions(
      (searchService?.suggest(term) || []).map((value) => ({ value }))
    );
  };

  const onSubmit = () => {
    if (!queryString.length) {
      return setResults(undefined);
    }

    const searchResults = searchService?.search(queryString) || [];

    setResults(
      searchResults.map(({ index, metadata: { preview } }) => ({
        ...initialData[index],
        preview,
      }))
    );
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
    suggestions,
    onSearch,
    onSubmit,
    setQueryString,
  };
};

export default useApp;
