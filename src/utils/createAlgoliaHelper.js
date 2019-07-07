import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'

var client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

export default function createAlgoliaHelper (index, config) {
  return algoliasearchHelper(client, index, config)
}