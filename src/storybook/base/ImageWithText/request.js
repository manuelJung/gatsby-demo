import * as img from '../Image/request'
import * as txt from '../Text/request'
import composeLifecycles from 'utils/composeLifecycles'

export const preprocessProps = async (...args) => {
  const composed = composeLifecycles({}, img.preprocessProps, txt.preprocessProps)
  return composed(...args)
}

export const createContext = async (...args) => {
  const composed = composeLifecycles({}, img.createContext, txt.createContext)
  return composed(...args)
}

export const createPartialStateUpdates = async (...args) => {
  const composed = composeLifecycles([], img.createPartialStateUpdates, txt.createPartialStateUpdates)
  return composed(...args)
}

export const StoryWrapper = ({Component, props}) => <Component {...props}/>