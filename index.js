const SearchService = require("./SearchService");
// const data = require("./data.json");

const data = [
  {
    title: "სათაური",
    text: "სამაგალითო ტექსტი",
    id: 345634634634,
  },
  {
    id: 43545774533,
    title: "Moby Dick",
    text: "Call me Ishmael. Some years ago...",
  },
  {
    id: 346346,
    title: "Zen and the Art of Motorcycle Maintenance",
    text: "I can see by my watch...",
  },
  {
    id: 346444346,
    title: "Neuromancer",
    text: "The sky above the port was...",
  },
  {
    id: 33455787634,
    title: "Zen and the Art of Archery",
    text: "At first sight it must seem...",
  },
  {
    id: 32323566,
    title: "სათაური(მაგალითი)",
    text: "ეს არის ტექსტი, სათაური",
  },
  {
    id: 5474834222,
    title: "გიორგი",
    text: "ეს არის ტექსტი, ტექსტი ასდასდსა, გიორგი, გიორგი",
  },
];

const searchService = new SearchService(data, { fields: ["title", "text"] });

searchService.search('fir')