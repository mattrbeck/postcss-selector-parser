// A minimal replacement for the `cssesc` package, covering only the three
// option shapes this library calls it with: `{isIdentifier: true}` and
// `{quotes: "single" | "double", wrap: true}`. The `escapeEverything`,
// `numericOnly` and `lowercaseHex` options are not implemented, since nothing
// here uses them.
//
// Derived from cssesc by Mathias Bynens (https://github.com/mathiasbynens/cssesc),
// MIT licensed. Verified to produce identical output to the package across
// every character in U+0000-U+02FF, surrogate pairs, astral code points and
// character pairs, for each of the option shapes above.
const regexSingleEscape = /[ -,./:-@[\]^`{-~]/;
const regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;

export default function cssesc(string, options = {}) {
  let quotes = options.quotes === "double" ? '"' : "'";
  let isIdentifier = options.isIdentifier;
  let firstChar = string.charAt(0);
  let output = "";
  let counter = 0;
  let length = string.length;

  while (counter < length) {
    let character = string.charAt(counter++);
    let codePoint = character.charCodeAt(0);
    let value;

    if (codePoint < 0x20 || codePoint > 0x7e) {
      if (codePoint >= 0xd800 && codePoint <= 0xdbff && counter < length) {
        let extra = string.charCodeAt(counter++);
        if ((extra & 0xfc00) === 0xdc00) {
          codePoint = ((codePoint & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
        } else {
          counter--;
        }
      }
      value = "\\" + codePoint.toString(16).toUpperCase() + " ";
    } else {
      // eslint-disable-next-line no-control-regex -- these control characters are exactly what needs escaping
      if (/[\t\n\f\r\x0B]/.test(character)) {
        value = "\\" + codePoint.toString(16).toUpperCase() + " ";
      } else if (
        character === "\\" ||
        (!isIdentifier && character === quotes) ||
        (isIdentifier && regexSingleEscape.test(character))
      ) {
        value = "\\" + character;
      } else {
        value = character;
      }
    }
    output += value;
  }

  if (isIdentifier) {
    if (/^-[-\d]/.test(output)) {
      output = "\\-" + output.slice(1);
    } else if (/\d/.test(firstChar)) {
      output = "\\3" + firstChar + " " + output.slice(1);
    }
  }

  output = output.replace(regexExcessiveSpaces, ($0, $1, $2) => {
    if ($1 && $1.length % 2) return $0;
    return ($1 || "") + $2;
  });

  if (!isIdentifier && options.wrap) {
    return quotes + output + quotes;
  }
  return output;
}
