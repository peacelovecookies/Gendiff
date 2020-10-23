import { has } from 'lodash';

const isObject = (value) => (typeof value === 'object' && !Array.isArray(value));
const getMeta = (key, obj1, obj2) => {
  const meta = { key, oldValue: obj1[key], newValue: obj2[key] };
  if (!has(obj2, key)) {
    return { ...meta, type: 'deleted' };
  }
  if (!has(obj1, key)) {
    return { ...meta, type: 'added' };
  }
  if (obj1[key] === obj2[key]) {
    return { ...meta, type: 'unchanged' };
  }
  return { ...meta, type: 'changed' };
};

export { isObject, getMeta };
