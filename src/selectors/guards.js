import {
  ATTRIBUTE,
  CLASS,
  COMBINATOR,
  COMMENT,
  ID,
  NESTING,
  PSEUDO,
  ROOT,
  SELECTOR,
  STRING,
  TAG,
  UNIVERSAL,
} from "./types";

export function isNode(node) {
  return typeof node === "object" && node !== null && !!node.type;
}

export const isAttribute = (node) => isNode(node) && node.type === ATTRIBUTE;
export const isClassName = (node) => isNode(node) && node.type === CLASS;
export const isCombinator = (node) => isNode(node) && node.type === COMBINATOR;
export const isComment = (node) => isNode(node) && node.type === COMMENT;
export const isIdentifier = (node) => isNode(node) && node.type === ID;
export const isNesting = (node) => isNode(node) && node.type === NESTING;
export const isPseudo = (node) => isNode(node) && node.type === PSEUDO;
export const isRoot = (node) => isNode(node) && node.type === ROOT;
export const isSelector = (node) => isNode(node) && node.type === SELECTOR;
export const isString = (node) => isNode(node) && node.type === STRING;
export const isTag = (node) => isNode(node) && node.type === TAG;
export const isUniversal = (node) => isNode(node) && node.type === UNIVERSAL;

export function isPseudoElement(node) {
  return (
    isPseudo(node) &&
    node.value &&
    (node.value.startsWith("::") ||
      node.value.toLowerCase() === ":before" ||
      node.value.toLowerCase() === ":after" ||
      node.value.toLowerCase() === ":first-letter" ||
      node.value.toLowerCase() === ":first-line")
  );
}

export function isPseudoClass(node) {
  return isPseudo(node) && !isPseudoElement(node);
}

export function isContainer(node) {
  return !!(isNode(node) && node.walk);
}

export function isNamespace(node) {
  return isAttribute(node) || isTag(node);
}
