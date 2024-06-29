import { getRegEx } from "./utils";

export class ResultService {
  #results = new Map();
  #suggestions = new Set();

  constructor(data = [], options = {}) {
    this.data = data;
    this.fields = options.fields || [];
    this.searchTerms = options.searchTerms || [];
  }

  #generateHints(metadata, field, fieldValue) {
    const multipleMatch = fieldValue.match(
      getRegEx(this.searchTerms.join(" "))
    );

    metadata.priority += multipleMatch ? multipleMatch.length + 1 : 1;

    metadata.preview[field] = fieldValue.replace(
      getRegEx(
        multipleMatch?.length ? this.searchTerms.join(" ") : this.searchTerms[0]
      ),
      "<mark>$&</mark>"
    );

    return metadata;
  }

  addSuggestions(char) {
    this.#suggestions.add(char);
  }

  addData(indexes) {
    indexes.forEach((index) => {
      if (this.#results.has(index)) {
        return;
      }

      let metadata = { preview: {}, priority: 0 };
      this.fields.forEach((field) =>
        this.#generateHints(metadata, field, this.data[index][field])
      );

      this.#results.set(index, { index, metadata });
    });
  }

  get results() {
    return Array.from(this.#results.values()).sort(
      (a, b) => b.metadata.priority - a.metadata.priority
    );
  }

  get suggestions() {
    return Array.from(this.#suggestions || []);
  }
}
