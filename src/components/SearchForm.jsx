import React from "react";
import {
  AutoComplete,
  Button,
  Divider,
  Flex,
  Select,
  Space,
  Typography,
} from "antd";
import { FETCH_ENDPOINTS } from "../hooks/useApp";

export default function SearchForm({
  suggestions,
  searchFields,
  minCharsCount,
  endpoint,
  searchFieldsOptions,
  setEndpoint,
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
          key={minCharsCount}
          options={suggestions}
          style={{ width: "100%" }}
          popupMatchSelectWidth={252}
          size="large"
          onSelect={(value) => setQueryString(value)}
          onSearch={(term) => onSearch(term)}
          placeholder="Search term..."
          onChange={(value) => setQueryString(value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") onSubmit();
          }}
        />
        <Button size="large" type="primary" onClick={onSubmit}>
          Search
        </Button>
      </Space.Compact>

      <Flex gap="middle" justify="space-between" style={{ marginTop: "10px" }}>
        <Flex gap={10} vertical>
          <Typography.Text>Fields to search in:</Typography.Text>
          <Select
            onChange={(value) => setSearchFields(value)}
            style={{ width: "200px" }}
            mode="multiple"
            value={searchFields}
            options={searchFieldsOptions}
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
      <Flex gap={10} vertical style={{ marginTop: "20px" }}>
        <Typography.Text>Fetch endpoint:</Typography.Text>
        <Select
          onChange={(value) => setEndpoint(value)}
          style={{ width: "400px" }}
          value={endpoint}
          options={FETCH_ENDPOINTS.map((field) => ({
            value: field,
            label: field,
          }))}
        />
      </Flex>
      <Divider />
    </>
  );
}
