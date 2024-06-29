import React from "react";
import { AutoComplete, Button, Flex, Select, Space, Typography } from "antd";

export default function SearchForm({
  suggestions,
  searchFields,
  minCharsCount,
  onSearch,
  setQueryString,
  setSearchFields,
  setMinCharsCount,
  onSubmit,
}) {
  return (
    <>
      <Space.Compact style={{ width: "100%", marginBottom: "10px" }}>
        <AutoComplete
          options={suggestions}
          style={{ width: "100%" }}
          popupMatchSelectWidth={252}
          size="large"
          onSelect={(value) => setQueryString(value)}
          onSearch={(term) => onSearch(term)}
          placeholder="Search term..."
          onChange={(value) => setQueryString(value)}
        />
        <Button size="large" type="primary" onClick={onSubmit}>
          Search
        </Button>
      </Space.Compact>

      <Flex gap="middle" justify="space-between">
        <Flex gap={10} vertical>
          <Typography.Text>Fields to search in:</Typography.Text>
          <Select
            onChange={(value) => setSearchFields(value)}
            style={{ width: "200px" }}
            mode="multiple"
            value={searchFields}
            options={[
              { label: "title", value: "title" },
              { label: "body", value: "body" },
            ]}
          />
        </Flex>
        <Flex gap={10} vertical>
          <Typography.Text>Min characters count:</Typography.Text>
          <Select
            onChange={(value) => setMinCharsCount(value)}
            style={{ width: "200px" }}
            value={minCharsCount}
            options={[
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
            ]}
          />
        </Flex>
      </Flex>
    </>
  );
}
