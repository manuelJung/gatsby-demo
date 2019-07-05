export default function composeLifecycles (default, ...fn) {
  const isArray = Array.isArray(default)
  return async (...args) => {
    const results = await Promise.all(fn.map(fn => fn ? fn(...args) : Promise.resolve(default)))
    return isArray
      ? [].concat(...results)
      : Object.assign({}, ...results)
  }
}