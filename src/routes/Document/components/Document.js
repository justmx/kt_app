import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Document extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acceptedFiles: []
    }
  }

  render () {
    const { firstName, lastName, address, suburb, postcode, dob, passport } = this.props.user
    const { acceptedFiles } = this.state
    return (
      <div style={{ borderWidth: '1px', borderColor: 'black' }}>
        <h4>Welcome {firstName}, here is your details:</h4>
      </div>
    )
  }
}

Document.propTypes = {
  user: PropTypes.object
}

export default Document
