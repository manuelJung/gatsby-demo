import toBase64 from 'utils/toBase64'

export const createContext = async props => {
  let base64 = await toBase64(props.src)
  return {base64}
}
