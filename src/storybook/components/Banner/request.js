import toBase64 from 'utils/toBase64'
import {makeHtml} from 'utils/transformMarkdown'

export const createContext = async ({props, cache}) => {
  let base64 = await toBase64(props.src)
  return {
    base64,
    titleRows: (props.title.match(/<\/p>/g) || []).length,
    subtitleRows: (props.subtitle.match(/<\/p>/g) || []).length
  }
}

export const preprocessProps = ({props}) => Object.assign({},props, {
  title: props.title ? makeHtml(props.title) : '',
  subtitle: props.subtitle ? makeHtml(props.subtitle) : ''
})
