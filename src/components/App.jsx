import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import useApp from "../hooks/useApp";

export default function App() {
  const props = useApp();
  const { results, ...searchProps } = props;

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "20px" }}>
      <SearchForm {...searchProps} />
      <SearchResults {...{ results }} />
    </div>
  );
}
