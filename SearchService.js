class SearchService {
  #root = {};

  constructor(data = [], options = {}) {
    this.data = options.data || data;
    this.fields = options.fields || [];
    this.regex = options.regex || {
      split: /\s/g,
      replace: /[.,\/#!$%\^&\*;:{}=\-_`~()'"“]/g,
    };

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

  #aggregateValues(node) {
    for (let key in node) {
      if (key === "values") {
        return node.values;
      }
      return this.#aggregateValues(node[key]);
    }
  }

  #findNode(chars, node) {
    if (chars.length === 0) {
      if (node?.values) {
        return node.values;
      }
      return this.#aggregateValues(node) || undefined;
    }

    const char = chars.shift();
    return this.#findNode(chars, node?.[char]);
  }

  search(query) {
    const searchTerm = this.#sanitizeWords(query)[0];
    const indexes = this.#findNode(this.#wordToChars(searchTerm), this.#root);

    return indexes || [];
  }
}

module.exports = SearchService;
