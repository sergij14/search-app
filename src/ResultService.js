const { getRegExUnion, getRegEx } = require("./utils");

class ResultService {
  #results = new Map();
  constructor(data = [], options = {}) {
    this.data = data;
    this.fields = options.fields || [];
    this.searchTerms = options.searchTerms || [];
  }

  #generateHints(metadata, field, fieldValue) {
    metadata.preview[field] = fieldValue.replace(
      getRegEx(getRegExUnion(this.searchTerms)),
      (match) => `<mark>${match}</mark>`
    );

    return metadata;
  }

  addData(indexes) {
    indexes.forEach((index) => {
      if (this.#results.has(index)) {
        return;
      }

      let metadata = { preview: {} };
      this.fields.forEach((field) =>
        this.#generateHints(metadata, field, this.data[index][field])
      );

      this.#results.set(index, { index, metadata });
    });
  }

  get results() {
    return Array.from(this.#results.values());
  }
}

module.exports = ResultService;
