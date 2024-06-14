class ResultService {
  #indexes = new Set();
  constructor(data, options) {
    this.data = data || [];
    this.fields = options.fields || [];
  }

  addData(indexes) {
    indexes.forEach((index) => {
      if (this.#indexes.has(index)) {
        return;
      }

      this.#indexes.add(index);

      const item = this.data[index];

      console.log(item);

      this.fields.forEach;
    });
  }

  get indexes() {
    return Array.from(this.#indexes);
  }
}

module.exports = ResultService;
