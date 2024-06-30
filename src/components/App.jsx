import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { useApp } from "../hooks/useApp";

export default function App() {
  const {
    results,
    setResults,
    initialData,
    searchFields,
    searchFieldsOptions,
    ...searchProps
  } = useApp();

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "20px" }}>
      <SearchForm {...{ ...searchProps, searchFields, searchFieldsOptions }} />
      <SearchResults
        {...{ searchFieldsOptions, results, setResults, initialData }}
      />
    </div>
  );
}
