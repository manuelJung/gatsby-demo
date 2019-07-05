

export const createContext = async (props, graphql) => {
  const data = await graphql(`get fluid image`)
  return {fluid: data.image.fluid}
}

export const preprocessProps = async props => {
  await utils.loadImage(props.src)
  return props
}