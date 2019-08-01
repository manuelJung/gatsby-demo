// @flow

export type UserConfig = $Diff<{
  alt: string,
  src: string,
  label: string,
  link: string,
},{}>

export type Context = $Diff<{
  base64: string,
},{}>

export type Props = $Diff<UserConfig & {
  context: Context
},{}>