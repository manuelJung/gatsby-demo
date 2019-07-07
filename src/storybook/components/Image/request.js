// import {downloadFile} from 'utils/fileLoader'
import toBase64 from 'utils/toBase64'

// export const createContext = async ({props, cache}) => {
//   // const data = await graphql(`
//   //   {
//   //     file(relativePath:{eq:"0a2d7cade07e0805ce22d47d2b36d4a2.jpg"}){
//   //       childImageSharp {
//   //         fluid {
//   //           src
//   //         }
//   //       }
//   //     }
//   //   }
//   // `)
//   // return {fluid: data.file.childImageSharp.fluid}
//   let base64 = await toBase64(props.src)
//   return {base64}
// }

export const preprocessProps = async ({props}) => {
  // await downloadFile(props.src)
  return props
}