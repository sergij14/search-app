import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import useApp from "../hooks/useApp";

export default function App() {
  const {
    results,
    suggestions,
    searchFields,
    onSearch,
    onSubmit,
    setQueryString,
    setSearchFields,
    setResults,
  } = useApp();

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "20px" }}>
      <SearchForm
        {...{
          suggestions,
          searchFields,
          onSearch,
          setQueryString,
          setResults,
          setSearchFields,
          onSubmit,
        }}
      />
      <SearchResults {...{ results }} />
    </div>
  );
}
