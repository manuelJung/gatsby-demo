
export default async function fetchCreateAlgoliaHelper () {
  let createAlgoliaHelper = await import('./createAlgoliaHelper')
  return createAlgoliaHelper
}