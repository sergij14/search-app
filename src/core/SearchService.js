import { ResultService } from "./ResultService";
import { sanitizeWords, wordToChars } from "./utils";

export class SearchService {
  #root = {};
  #suggestions;

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

        const words = sanitizeWords(
          fieldValue,
          this.regex.replace,
          this.regex.split
        );
        words.forEach((word) => {
          if (word.length < this.min) {
            return;
          }
          this.#mapWordChars(wordToChars(word), index, this.#root);
        });
      });
    });
  }

  #aggregateNodes(node, char) {
    if (node.values?.length) {
      if (char) {
        return this.#suggestions.add(char);
      }

      this.resultService.addData(node.values);
    }
    for (let key in node) {
      if (key !== "values") {
        this.#aggregateNodes(node[key], char ? char + key : undefined);
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

  suggest(prefix) {
    if (prefix.length < this.min) {
      return [];
    }

    let node = this.#root;
    let char = "";
    this.#suggestions = new Set();

    for (let i = 0; i < prefix.length; i++) {
      if (!node[prefix[i]]) {
        return [];
      }
      node = node[prefix[i]];
      char += prefix[i];
    }

    this.#aggregateNodes(node, char);
    return this.suggestions;
  }

  search(query) {
    const [searchTerm, ...restSearchTerms] = sanitizeWords(
      query,
      this.regex.replace,
      this.regex.split
    );

    if (searchTerm.length < this.min) {
      return [];
    }

    const node = this.#findNode(wordToChars(searchTerm), this.#root);

    if (!node) {
      return [];
    }

    this.resultService = new ResultService(this.data, {
      fields: this.fields,
      searchTerms: [searchTerm, ...(restSearchTerms || [])],
    });

    this.#aggregateNodes(node);

    return this.resultService.results;
  }

  get trie() {
    return this.#root;
  }

  get suggestions() {
    return Array.from(this.#suggestions);
  }
}
