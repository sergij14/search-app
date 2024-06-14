const REGEX = {
  split: /\s/g,
  replace: /[.,\/#!$%\^&\*;:{}=\-_`~()'"“]/g,
};

class SearchService {
  #root = {};

  constructor(data = [], { fields = [], regex = REGEX }) {
    this.data = data;
    this.fields = fields;
    this.regex = regex;

    this.#addData();

    console.log(JSON.stringify(this.#root, null, 4));
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
    if (!chars.length) {
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
          this.#mapWordChars(this.#wordToChars(word), index, this.#root);
        });
      });
    });
  }
}

module.exports = SearchService;
