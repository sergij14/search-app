import { List, Space } from "antd";

export default function SearchResults({ results }) {
  return (
    <Space
      direction="vertical"
      style={{ margin: "20px 0", width: "100%" }}
      size="middle"
    >
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
    </Space>
  );
}
