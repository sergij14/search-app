import { useEffect, useState } from "react";
import { SearchService } from "../core/SearchService";

export const FETCH_ENDPOINTS = [
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/todos",
];

export const useApp = () => {
  const [results, setResults] = useState();
  const [initialData, setInitialData] = useState();
  const [searchService, setSearchService] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [searchFields, setSearchFields] = useState([]);
  const [searchFieldsOptions, setSearchFieldsOptions] = useState([]);
  const [minCharsCount, setMinCharsCount] = useState(2);
  const [endpoint, setEndpoint] = useState(FETCH_ENDPOINTS[0]);

  const onSearch = (term) => {
    if (!term.length) {
      return setResults(undefined);
    }
    setSuggestions(
      (searchService?.search(term).suggestions || []).map((value) => ({
        value,
      }))
    );
  };

  const onSubmit = () => {
    if (!queryString.length) {
      return setResults(undefined);
    }

    const { results: searchResults } = searchService?.search(queryString) || [];

    setResults(
      searchResults.map(({ index, metadata: { preview } }) => ({
        ...initialData[index],
        preview,
      }))
    );
  };

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const fields = Object.keys(data[0]).filter(
          (field) => typeof data[0][field] === "string"
        );

        setSearchFieldsOptions(
          fields.map((field) => ({ label: field, value: field }))
        );
        setSearchFields(fields);
        setInitialData(data);
      });
  }, [endpoint]);

  useEffect(() => {
    if (initialData) {
      setSearchService(
        new SearchService(initialData, {
          fields: searchFields,
          min: minCharsCount,
        })
      );
      setResults(undefined);
      setSuggestions([]);
      setQueryString("");
    }
  }, [minCharsCount, searchFields, initialData, endpoint]);

  return {
    results,
    initialData,
    suggestions,
    searchFields,
    minCharsCount,
    endpoint,
    searchFieldsOptions,
    setEndpoint,
    onSearch,
    onSubmit,
    setQueryString,
    setSearchFields,
    setMinCharsCount,
    setResults,
  };
};
