export function sanitizeWords(string = "", replaceRegEx = "", splitRegEx = "") {
  return string
    .toLowerCase()
    .replace(replaceRegEx, "")
    .split(splitRegEx)
    .filter((word) => word);
}

export function wordToChars(words = []) {
  return words.split("");
}

export function getRegEx(str, flags = "gi") {
  return new RegExp(`${str}`, flags);
}
