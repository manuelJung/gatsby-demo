


function useStorefinder (props) {
  const hook = useConnect()

  React.useEffect(() => {
    if(hook.shouldFetch) hook.fetch()
  })

  return hook
}

useStorefinder.preload = function (store, props) {
  store.dispatch(a.fetch(props.identifier))
  
  return new Promise((resolve,reject) => {
    store.addRule({
      id: 'useStorefinder',
      target: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
      consequence: ({action}) => {
        if(action.type === at.FETCH_FAILURE) reject()
        else resolve()
      }
    })
  })
}