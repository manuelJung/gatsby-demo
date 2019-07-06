import {makeHtml} from 'utils/transformMarkdown'
import toBase64 from 'utils/toBase64'

export const createContext = async ({props, cache}) => {
  let base64 = await toBase64(props.imageProps.src)
  return {base64}
}

export const preprocessProps = ({props}) => Object.assign({},props, {
  textProps: {
    ...props.textProps,
    children: makeHtml(props.children)
  }
})