// @flow
import { applyMiddleware, compose, createStore } from 'redux'
import makeRootReducer from './reducers'
import ruleMiddleware from 'redux-ruleset'


export default (initialState = {}, history:* = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    ruleMiddleware
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  let hasWindow
  try {if(window) hasWindow = true}
  catch(e) {hasWindow = false}
  
  if (process.env.NODE_ENV === 'development') {
    if(hasWindow){
      const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      if (typeof composeWithDevToolsExtension === 'function') {
        composeEnhancers = composeWithDevToolsExtension
      }
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    // $FlowFixMe
    composeEnhancers(
      ...enhancers,
      // $FlowFixMe
      applyMiddleware/*::<RootState,Action,Dispatch>*/(...middleware)
    )
  )
  // $FlowFixMe
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  // $FlowFixMe
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      // $FlowFixMe
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }
  // $FlowFixMe
  return store
}
