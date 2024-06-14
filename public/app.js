function SearchForm({ setResults, setLoading, onSetInitialData, initialData }) {
  const [queryString, setQueryString] = React.useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (queryString.length) {
      setLoading(true);
      fetch(`/search?term=${queryString}`)
        .then((res) => res.json())
        .then(({ data: indexes }) => {
          setResults(indexes.map((idx) => initialData[idx]));
          setLoading(false);
        });
      return;
    }
    onSetInitialData();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={queryString}
        onChange={({ target }) => setQueryString(target.value)}
        type="text"
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

function SearchResults({ results }) {
  return (
    <div>
      <h2>Data count: {results?.length || 0}</h2>
      {(results || []).map(({ title, id, text }) => {
        return (
          <div
            key={id}
            style={{
              border: "1px gray solid",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{title}</h3>
            <p>id: {id}</p>
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
}

function MyApp() {
  const [results, setResults] = React.useState();
  const [loading, setLoading] = React.useState();
  const [initialData, setInitialData] = React.useState();
  const fetchData = () => fetch("/data");

  React.useEffect(() => {
    setLoading(true);
    fetchData()
      .then((res) => res.json())
      .then(({ data }) => {
        setInitialData(data);
        setLoading(false);
      });
  }, []);

  const onSetInitialData = () => {
    fetchData()
      .then((res) => res.json())
      .then((data) => {
        setInitialData(data);
        setLoading(false);
        setResults(undefined);
      });
  };

  return (
    <>
      <SearchForm
        {...{ setResults, initialData, setLoading, onSetInitialData }}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SearchResults {...{ results: results || initialData }} />
      )}
    </>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);