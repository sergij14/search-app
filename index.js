const express = require("express");
const SearchService = require("./SearchService");

const smallData = require("./small-data.json");

const app = express();
const port = 3000;

const searchService = new SearchService(smallData, {
  fields: ["title", "text"],
});

app.get("/search", (req, res) => {
  const { query } = req;
  res.send(searchService.search(query.term));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
