class SearchService {
  #root = {};

  constructor(data = [], options = {}) {
    this.data = options.data || data;
    this.fields = options.fields || [];
    this.regex = options.regex || {
      split: /\s/g,
      replace: /[.,\/#!$%\^&\*;:{}=\-_`~()'"“]/g,
    };
    this.min = options.min || 3;

    this.#addData();
  }

  #sanitizeWords(string) {
    return string
      .toLowerCase()
      .replace(this.regex.replace, "")
      .split(this.regex.split)
      .filter((word) => word);
  }

  #wordToChars(words) {
    return words.split("");
  }

  #mapWordChars(chars, index, node) {
    if (chars.length === 0) {
      node.values = node.values || [];

      if (!node.values.includes(index)) {
        node.values.push(index);
      }

      return;
    }
    const char = chars.shift();
    node[char] = node[char] || {};

    this.#mapWordChars(chars, index, node[char]);
  }

  #addData() {
    this.data.forEach((item, index) => {
      this.fields.forEach((field) => {
        const fieldValue = item[field];
        if (!fieldValue) {
          return;
        }

        const words = this.#sanitizeWords(fieldValue);
        words.forEach((word) => {
          if (word.length < this.min) {
            return;
          }
          this.#mapWordChars(this.#wordToChars(word), index, this.#root);
        });
      });
    });
  }

  #aggregateNodes(node, result) {
    if (node.values?.length) {
      result.push(...node.values);
    }
    for (let key in node) {
      if (key !== "values") {
        this.#aggregateNodes(node[key], result);
      }
    }
  }

  #findNode(chars, node) {
    if (chars.length === 0) {
      return node;
    }

    const char = chars.shift();
    return this.#findNode(chars, node?.[char]);
  }

  search(query) {
    const searchTerm = this.#sanitizeWords(query)[0];
    if (searchTerm.length < this.min) {
      return [];
    }

    const node = this.#findNode(this.#wordToChars(searchTerm), this.#root);

    if (!node) {
      return [];
    }

    const resultIndexes = [];
    this.#aggregateNodes(node, resultIndexes);

    return resultIndexes;
  }
}

module.exports = SearchService;
