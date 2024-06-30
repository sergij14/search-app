import { Button, Card, Flex, List, Typography } from "antd";

export default function SearchResults({
  searchFieldsOptions,
  results,
  initialData,
  setResults,
}) {
  return (
    <>
      {results ? (
        <Flex align="baseline" justify="space-between">
          <Typography.Title level={4} style={{ marginTop: "40px" }}>
            Results count: {results.length}
          </Typography.Title>
          <Button icon={"X"} onClick={() => setResults(undefined)}>
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
        renderItem={(item) => (
          <List.Item>
            <Card style={{width: '100%'}}>
              {searchFieldsOptions.map(({ value }) => (
                <div key={value} style={{ margin: "16px 0" }}>
                  <Typography.Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {value}:
                  </Typography.Text>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.preview?.[value] || item[value],
                    }}
                    style={{ margin: "0" }}
                  />
                </div>
              ))}
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
