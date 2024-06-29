import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import useApp from "../hooks/useApp";

export default function App() {
  const { results, suggestions, onSearch, onSubmit, setQueryString } = useApp();

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: '20px' }}>
      <SearchForm
        {...{
          suggestions,
          onSearch,
          setQueryString,
          onSubmit,
        }}
      />
      <SearchResults {...{ results }} />
    </div>
  );
}
