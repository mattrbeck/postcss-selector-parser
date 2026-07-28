export default function ensureObject(obj, ...props) {
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (!obj[prop]) {
      obj[prop] = {};
    }
    obj = obj[prop];
  }
}
