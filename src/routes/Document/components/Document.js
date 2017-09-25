import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FileUploadProgress from '../../../containers/FileUploadProgressContainer'
import StaticTextField from '../../../components/StaticTextField'
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import './Document.scss'

class Document extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acceptedFiles: [],
      showSupportDoc: false,
      showErrorMessage: false
    }
  }

  renderUploadedFiles = (file) => {
    const f = file.file
    return (
      <p key={f.name}>{f.name} - {f.size} bytes
        <Button bsStyle='danger' bsClass='sm_btn'
          onClick={() => {
            this.props.deleteFile(file)
          }
        } >
          <i className='fa fa-times' aria-hidden='true' />
        </Button></p>
    )
  }

  submit = () => {
    const { supportFiles, mandatoryFiles, resetFiles } = this.props
    if (supportFiles.length > 0 && mandatoryFiles.length > 0) {
      window.alert('You have successfully submitted all required files. Back Home now')
      resetFiles()
      this.props.router.push('/')
    } else {
      this.setState({ showErrorMessage: true })
    }
  }

  render () {
    const { firstName, lastName, address, suburb, postcode, dob, passport } = this.props.user
    const { supportFiles, mandatoryFiles } = this.props
    const { showErrorMessage } = this.state
    let type, header
    if (mandatoryFiles.length < 1) {
      type = 'mandatory'
      header = 'Please upload your mandatory file(Passport Other countries) file'
    } else {
      type = 'support'
      header = 'Please upload your support files'
    }

    return (
      <div id='user_detail'>
        <h2>Welcome {firstName}, here is your details:</h2>
        {showErrorMessage && <h6 className='error_msg'>
          You have to submit Mandatory files and Supporting files to continue
          </h6>}
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
            <h5>{header}</h5>
            <h6>(Format: png, pdf, jpeg)</h6>
            <FileUploadProgress type={type}
              key='upload_form' id='upload_form'
            />
          </Col>
        </Row>
        {mandatoryFiles.length > 0 && <div><h4>Uploaded Mandatory Files: </h4>
          <ul>
            {
              mandatoryFiles.map(this.renderUploadedFiles)
            }
          </ul>
        </div>}
        { supportFiles.length > 0 && <div><h4>Uploaded Supporting Files: </h4>
          <ul>
            {
              supportFiles.map(this.renderUploadedFiles)
            }
          </ul>
        </div>}
        <Button type='submit' bsStyle='primary' onClick={this.submit} id='submit_button'>Submit</Button>
      </div>
    )
  }
}

Document.propTypes = {
  user: PropTypes.object,
  router: PropTypes.object,
  supportFiles: PropTypes.array,
  mandatoryFiles: PropTypes.array,
  deleteFile: PropTypes.func,
  resetFiles: PropTypes.func
}

export default Document
