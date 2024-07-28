import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { useApp } from "../hooks/useApp";
import styles from './App.module.css';

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
    <div className={styles.container}>
      <SearchForm {...{ ...searchProps, searchFields, searchFieldsOptions }} />
      <SearchResults
        {...{ searchFieldsOptions, results, setResults, initialData }}
      />
    </div>
  );
}
