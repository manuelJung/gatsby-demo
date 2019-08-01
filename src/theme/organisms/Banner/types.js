// @flow

export type UserConfig = $Diff<{
  src: string,
  alt: string,
  link: string,
  title: string,
  subtitle: string,
  overlayColor: string,
  overlayPosition: string,
  ratio: number,
  ratioSubtitle: number,
},{}>

export type Context = $Diff<{
  base64: string,
  titleRows: number,
  subtitleRows: number
},{}>

export type Props = $Diff<UserConfig & {
  context: Context
},{}>