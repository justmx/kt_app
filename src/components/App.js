import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

// fix style here
  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%', flexDirection: 'column', display: 'flex', backgroundColor: '#384047' }}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </Provider>
    )
  }
}

export default App
