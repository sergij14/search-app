const SearchService = require("./SearchService");
// const data = require("./data.json");

const data = [
  {
    id: 0,
    title: "Moby Dick",
    text: "Call me Ishmael. Some years ago...",
  },
  {
    id: 1,
    title: "Zen and the Art of Motorcycle Maintenance",
    text: "I can see by my watch...",
  },
  {
    id: 2,
    title: "Neuromancer",
    text: "The sky above the port was...",
  },
  {
    id: 3,
    title: "Zen and the Art of Archery",
    text: "At first sight it must seem...",
  },
  {
    id: 4,
    title: "Zen and the Art of Archery",
    text: "At first sight it must seem...",
  },
  {
    id: 5,
    title: "sample title",
    text: "sampel default text...",
  },
];

const searchService = new SearchService(data, { fields: ["title", "text"] });

searchService.search("fir ");
