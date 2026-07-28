export default function getProp(obj, ...props) {
  for (let i = 0; i < props.length; i++) {
    if (!obj) {
      return undefined;
    }
    obj = obj[props[i]];
  }
  return obj;
}
