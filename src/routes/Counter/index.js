export default (store) => ({
  path : 'counter',
  onEnter: (nextState, replace) => {
    const state = store.getState()
    if (state.counter === 0) {
      replace('/')
    }
  },
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      const Counter = require('./containers/CounterContainer').default
      // const reducer = require('./modules/counter').default
      // injectReducer(store, { key: 'counter', reducer })
      cb(null, Counter)
    }, 'counter')
  }
})
