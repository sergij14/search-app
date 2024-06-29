export default function SearchResults({ results }) {
  return (
    <div>
      <h2>Data count: {results?.length || 0}</h2>
      {(results || []).map(({ title, id, body, preview = {} }) => {
        return (
          <div
            key={id}
            style={{
              border: "1px gray solid",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3
              dangerouslySetInnerHTML={{
                __html: `${preview?.title ? preview.title : title}`,
              }}
            />
            <p>id: {id}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: `${preview?.body ? preview.body : body}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
