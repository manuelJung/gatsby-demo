
const data = 'Hello World'
export function fetch () {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), 2000)
  })
}