import { ResultService } from "./ResultService";
import { sanitizeWords, wordToChars } from "./utils";

export class SearchService {
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

  #aggregateNodes(node) {
    if (node.values?.length) {
      this.resultService.addData(node.values);
    }
    for (let key in node) {
      if (key !== "values") {
        this.#aggregateNodes(node[key]);
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

  #suggestHelper(node, list, curr) {
    if (!Object.keys(node).length) {
      return;
    }

    if (node.values?.length) {
      list.push(curr);
    }

    for (let char in node) {
      this.#suggestHelper(node[char], list, curr + char);
    }
  }

  suggest(prefix) {
    let node = this.#root;
    let curr = "";

    for (let i = 0; i < prefix.length; i++) {
      if (!node[prefix[i]]) {
        return [];
      }
      node = node[prefix[i]];
      curr += prefix[i];
    }

    let list = [];

    this.#suggestHelper(node, list, curr);
    return list;
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

    console.log(this.suggest(searchTerm));

    return this.resultService.results;
  }

  get trie() {
    return this.#root;
  }
}
