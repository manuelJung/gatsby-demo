// @flow
import String from './String'
// import Select from './Select'
import Boolean from './Boolean'
import Number from './Number'
// import Array from './Array'
import Constant from './Constant'
import Markdown from './Markdown'

export const types = {
  STRING: 'STRING',
  SELECT: 'SELECT',
  BOOLEAN: 'BOOLEAN',
  NUMBER: 'NUMBER',
  ARRAY: 'ARRAY',
  CONSTANT: 'CONSTANT',
  MARKDOWN: 'MARKDOWN',
  IMAGE_SRC: 'IMAGE_SRC'
}

const dict = {
  [types.STRING]: String,
  // [types.SELECT]: Select,
  [types.BOOLEAN]: Boolean,
  [types.NUMBER]: Number,
  // [types.ARRAY]: Array,
  [types.CONSTANT]: Constant,
  [types.MARKDOWN]: Markdown
}

export const getComponent = (type:string) => dict[type]