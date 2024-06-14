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
    console.log(chars, index);
  }

  #addData() {
    this.data.forEach((item, index) => {
      this.fields.forEach((field) => {
        const fieldValue = item[field];
        if (!fieldValue) {
          return;
        }

        const words = this.#sanitizeWords(fieldValue);
        words.forEach((word) =>
          this.#mapWordChars(this.#wordToChars(word), index, this.#root)
        );
      });
    });
  }
}

module.exports = SearchService;
