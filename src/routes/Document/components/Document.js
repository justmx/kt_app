import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FileUploadProgress from '../../../components/FileUploadProgress'
import { remove } from 'lodash'
import StaticTextField from '../../../components/StaticTextField'
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import './Document.scss'
const url = 'http://localhost:3000/api/upload'

class Document extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acceptedFiles: [],
      showSupportDoc: false
    }
  }

  addFiles = (file) => {
    let acceptedFiles = this.state.acceptedFiles
    acceptedFiles.push(file)
    this.setState({ acceptedFiles })
  }

  addMandatoryFile = (file) => {
    this.addFiles(file)
    this.setState({ showSupportDoc: true })
  }

  deleteFile = (file) => {
    let acceptedFiles = this.state.acceptedFiles
    remove(acceptedFiles, (f) => {
      return file === f
    })
    this.setState({ acceptedFiles })
  }

  renderUploadedFile = (file) => {
    return (
      <li key={file.name}>{file.name} - {file.size} bytes
        <Button bsStyle='danger' bsClass='sm_btn'
          onClick={() => {
            this.deleteFile(file)
          }
        } >
          <i className='fa fa-times' aria-hidden='true' />
        </Button></li>
    )
  }

  render () {
    const { firstName, lastName, address, suburb, postcode, dob, passport } = this.props.user
    const { acceptedFiles, showSupportDoc } = this.state

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
        <Row>
          <Col xs={6} xsPush={3}>
            <h6>Please upload your Passport (Other countries) file</h6>
            <FileUploadProgress key='mandatory_form' url={url}
              id='mandatory'
              onDone={this.addMandatoryFile}
            />
          </Col>
        </Row>
        { showSupportDoc && <Row>
          <Col xs={6} xsPush={3}>
            <h6>Please upload your Support file</h6>
            <FileUploadProgress key='support_form' url={url}
              id='support'
              onDone={this.addFiles}
            />
          </Col>
        </Row>}
        <div>
          { acceptedFiles.length > 0 && <h4>Uploaded Files: </h4>}
          <ul>
            {
              acceptedFiles.map(this.renderUploadedFile)
            }
          </ul>
        </div>
      </div>
    )
  }
}

Document.propTypes = {
  user: PropTypes.object
}

export default Document
