const REGEX = {
  split: /\s/g,
  replace: /[.,\/#!$%\^&\*;:{}=\-_`~()'"“]/g,
};

class SearchService {
  constructor(data = [], { fields = [], regex = REGEX }) {
    this.data = data;
    this.fields = fields;
    this.regex = regex;

    this.addData();
  }

  sanitizeWords(string) {
    return string
      .toLowerCase()
      .replace(this.regex.replace, "")
      .split(this.regex.split)
      .map((word) => word.trim())
      .filter((word) => word);
  }

  addData() {
    this.data.forEach((item, index) => {
      this.fields.forEach((field) => {
        const fieldValue = item[field];
        if (!fieldValue) {
          return;
        }

        const words = this.sanitizeWords(fieldValue);

        console.log(words);
      });
    });
  }
}

module.exports = SearchService;
