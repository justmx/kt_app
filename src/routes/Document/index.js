export default (store) => ({
  path : 'document',
  onEnter: (nextState, replace) => {
    const state = store.getState()
    if (!state.user.user || !state.user.user.firstName) {
      replace('/')
    }
  },
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      const Document = require('./containers/DocumentContainer').default
      cb(null, Document)
    }, 'document')
  }
})
