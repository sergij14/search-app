import { SearchService } from "../core/SearchService";

const data = [
  {
    title: "Adeel Solangi",
    id: "V59OF92YF627HFY0",
    text: "Donec lobortis eleifend condimentum. Cras dictum dolor lacinia lectus vehicula rutrum. Maecenas quis nisi nunc. Nam tristique feugiat est vitae mollis. Maecenas quis nisi nunc.",
  },
  {
    title: "Afzal Ghaffar",
    id: "ENTOCR13RSCLZ6KU",
    text: "Aliquam sollicitudin ante ligula, eget malesuada nibh efficitur et. Pellentesque massa sem, scelerisque sit amet odio id, cursus tempor urna. Etiam congue dignissim volutpat. Vestibulum pharetra libero et velit gravida euismod.",
  },
  {
    title: "Aamir Solangi",
    id: "IAKPO3R4761JDRVG",
    text: "Solangi Vestibulum pharetra libero et velit gravida euismod. Quisque mauris ligula, efficitur porttitor sodales ac, lacinia non ex. Fusce eu ultrices elit, vel posuere neque.",
  },
  {
    title: "Adeel Solangi",
    id: "V59OF92YF627HFY0",
    text: "Donec lobortis eleifend condimentum. Cras dictum dolor lacinia lectus vehicula rutrum. Maecenas quis nisi nunc. Nam tristique feugiat est vitae mollis. Maecenas quis nisi nunc.",
  },
];

describe("SearchService", () => {
  let searchService;

  beforeEach(() => {
    searchService = new SearchService(data, {
      fields: ["title", "text"],
    });
  });

  it("should build a map of nodes", () => {
    expect(searchService.trie["a"]).toBeDefined();
    expect(searchService.trie["a"]["d"]).toBeDefined();
    expect(searchService.trie["a"]["d"]["e"]).toBeDefined();
    expect(searchService.trie["a"]["d"]["e"]["e"]).toBeDefined();
  });

  it("should assign item indexes to the node value", () => {
    expect(searchService.trie["a"]["d"]["e"]["e"]["l"].values).toEqual([0, 3]);
    expect(searchService.trie["a"]["a"]["m"]["i"]["r"].values).toEqual([2]);
  });

  it("should search through the trie, aggregate nodes and return item indexes", () => {
    expect(
      searchService.search("ade").results.map((item) => item.index)
    ).toEqual([0, 3]);
    expect(
      searchService.search("aam").results.map((item) => item.index)
    ).toEqual([2]);
  });

  it("should search through the trie and return item indexes", () => {
    expect(
      searchService.search("adeel").results.map((item) => item.index)
    ).toEqual([0, 3]);
    expect(
      searchService.search("aamir").results.map((item) => item.index)
    ).toEqual([2]);
  });

  it("should not index certain words when min prop is provided", () => {
    searchService = new SearchService(data, {
      fields: ["title", "text"],
      min: 4,
    });

    expect(searchService.search("ade").results).toEqual([]);
    expect(searchService.search("aam").results).toEqual([]);
  });

  it("should suggest words", () => {
    expect(searchService.search("sol").suggestions).toEqual([
      "solangi",
      "sollicitudin",
    ]);
  });
});
