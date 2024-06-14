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
    // console.log(JSON.stringify(this.#root, null, 4));
  }

  #sanitizeWords(string) {
    return string
      .toLowerCase()
      .replace(this.regex.replace, "")
      .split(this.regex.split)
      .map((word) => word.trim())
      .filter((word) => word);
  }

  #wordToChars(words) {
    return words.split("");
  }

  #mapWordChars(chars, index, node) {
    if (chars.length === 0) {
      node.value = node.value || null;

      if (!node.value) {
        node.value = index;
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

  #aggregateValue(node) {
    for (let key in node) {
      if (key === "value") {
        return node.value;
      }
      return this.#aggregateValue(node[key]);
    }
  }

  #findNode(chars, node) {
    if (chars.length === 0) {
      if (node.value) {
        return node.value;
      }
      return this.#aggregateValue(node);
    }

    const char = chars.shift();
    return this.#findNode(chars, node?.[char]);
  }

  search(query) {
    const searchTerm = this.#sanitizeWords(query)[0];
    const index = this.#findNode(this.#wordToChars(searchTerm), this.#root);

    console.log(index);
  }
}

module.exports = SearchService;
