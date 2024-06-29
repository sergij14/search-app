import React from "react";
import { AutoComplete, Button, Space } from "antd";

export default function SearchForm({
  suggestions,
  onSearch,
  setQueryString,
  onSubmit,
}) {
  return (
    <Space.Compact style={{ width: "100%" }}>
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
  );
}
