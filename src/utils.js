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

module.exports = {
  wordToChars,
  sanitizeWords,
};
