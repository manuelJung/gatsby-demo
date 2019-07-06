import {makeHtml} from 'utils/transformMarkdown'

export const preprocessProps = ({props}) => Object.assign({},props, {
  children: makeHtml(props.children)
})