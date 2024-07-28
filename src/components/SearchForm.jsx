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
import styles from "./App.module.css";

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
      <Space.Compact className={styles["search-form"]}>
        <AutoComplete
          key={JSON.stringify({ minCharsCount, endpoint })}
          options={suggestions}
          className={styles["width-full"]}
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

      <Flex className={styles["search-props"]}>
        <Flex gap={10} vertical>
          <Typography.Text>Fields to search in:</Typography.Text>
          <Select
            onChange={(value) => setSearchFields(value)}
            className={styles["width-full"]}
            mode="multiple"
            value={searchFields}
            options={searchFieldsOptions}
          />
        </Flex>
        <Flex gap={10} vertical>
          <Typography.Text>Min characters count:</Typography.Text>
          <Select
            onChange={(value) => setMinCharsCount(value)}
            className={styles["width-full"]}
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
          className={styles["width-full"]}
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
