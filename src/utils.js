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

function getRegExUnion(words) {
  if (words.length === 1) {
    return words[0];
  }

  return words
    .map((word, idx) => `${word}${idx === words.length - 1 ? "" : "|"}`)
    .join("");
}

module.exports = {
  wordToChars,
  sanitizeWords,
  getRegEx,
  getRegExUnion,
};
