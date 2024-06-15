function sanitizeWords(string = "", replaceRegEx = "", splitRegEx = "") {
  return string
    .toLowerCase()
    .replace(replaceRegEx, "")
    .split(splitRegEx)
    .filter((word) => word);
}

function wordToChars(words = []) {
  return words.split("");
}

function getRegEx(str, flags = "gi") {
  return new RegExp(`${str}`, flags);
}

module.exports = {
  wordToChars,
  sanitizeWords,
  getRegEx,
};
