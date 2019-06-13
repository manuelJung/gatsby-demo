import store from 'store/bootstrap'
import useStorefinder from 'modules/Storefinder/hooks/useStorefinder'

export default function redux (props) {
  const [stateKey, state] = await useStorefinder.extractState(props.city)
  return [stateKey, state]
}