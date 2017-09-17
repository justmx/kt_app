import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StaticTextField from '../../../components/staticTextField'

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
        <div>
          <StaticTextField label='First Name' value={firstName} horizontal />
          <StaticTextField label='Last Name' value={lastName} horizontal />
          <StaticTextField label='Address' value={address} horizontal />
          <StaticTextField label='Suburb' value={suburb} horizontal />
          <StaticTextField label='Postcode' value={postcode} horizontal />
          <StaticTextField label='Date of Birth' value={dob} horizontal />
          <StaticTextField label='ID' value={passport} horizontal />
        </div>
      </div>
    )
  }
}

Document.propTypes = {
  user: PropTypes.object
}

export default Document
