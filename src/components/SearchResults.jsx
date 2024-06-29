import { List, Typography } from "antd";

export default function SearchResults({ results }) {
  return (
    <>
      {results ? (
        <Typography.Title level={4} style={{ marginTop: "40px" }}>
          Results count: {results.length}
        </Typography.Title>
      ) : null}
      <List
        pagination={{
          position: "bottom",
          align: "end",
          pageSize: 25,
          showSizeChanger: false,
        }}
        dataSource={results}
        renderItem={({ title, id, body, preview = {} }) => (
          <List.Item>
            <List.Item.Meta
              title={
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${preview?.title ? preview.title : title}`,
                  }}
                />
              }
              description={
                <>
                  <p>ID: {id}</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${preview?.body ? preview.body : body}`,
                    }}
                  />
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}
