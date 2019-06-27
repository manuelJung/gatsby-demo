
const data = 'Hello World'
export default function fetch () {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), 2000)
  })
}