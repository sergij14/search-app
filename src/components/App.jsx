import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import useApp from "../hooks/useApp";

export default function App() {
  const {
    setResults,
    initialData,
    searchService,
    results,
    queryString,
    setQueryString,
    onSubmit,
  } = useApp();

  return (
    <>
      <SearchForm
        {...{
          setResults,
          initialData,
          searchService,
          queryString,
          setQueryString,
          onSubmit,
        }}
      />
      <SearchResults {...{ results }} />
    </>
  );
}
