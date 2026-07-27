export default function ensureObject(obj, ...props) {
  for (let i = 0; i < props.length; i++) {
    let p = props[i];
    if (!obj[p]) obj[p] = {};
    obj = obj[p];
  }
}
