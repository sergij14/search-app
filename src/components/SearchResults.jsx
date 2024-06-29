import { Button, Flex, List, Typography } from "antd";

export default function SearchResults({ results, initialData, setResults }) {
  return (
    <>
      {results ? (
        <Flex align="baseline" justify="space-between">
          <Typography.Title level={4} style={{ marginTop: "40px" }}>
            Results count: {results.length}
          </Typography.Title>
          <Button
            disabled={!results?.length}
            icon={"X"}
            onClick={() => setResults(undefined)}
          >
            Clear
          </Button>
        </Flex>
      ) : null}
      <List
        pagination={{
          position: "bottom",
          align: "end",
          pageSize: 25,
          showSizeChanger: false,
        }}
        dataSource={results || initialData}
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
