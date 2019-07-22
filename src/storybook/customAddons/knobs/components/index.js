// @flow
import Text from './Text'
// import Select from './Select'
import Boolean from './Boolean'
// import Number from './Number'
// import Array from './Array'
// import Constant from './Constant'
import DraftText from './DraftText'
// import ImageSrc from './ImageSrc'

export const types = {
  TEXT: 'TEXT',
  SELECT: 'SELECT',
  BOOLEAN: 'BOOLEAN',
  NUMBER: 'NUMBER',
  ARRAY: 'ARRAY',
  CONSTANT: 'CONSTANT',
  DRAFTTEXT: 'DRAFTTEXT',
  IMAGE_SRC: 'IMAGE_SRC'
}

const dict = {
  [types.TEXT]: Text,
  // [types.SELECT]: Select,
  [types.BOOLEAN]: Boolean,
  // [types.NUMBER]: Number,
  // [types.ARRAY]: Array,
  // [types.CONSTANT]: Constant,
  [types.DRAFTTEXT]: DraftText,
  // [types.IMAGE_SRC]: ImageSrc
}

export const getComponent = (type:string) => dict[type]