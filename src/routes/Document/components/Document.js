import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import FileUploadProgress from '../../../components/FileUploadProgress'
import FileUploadProgress from '../../../containers/FileUploadProgressContainer'
import { remove } from 'lodash'
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

  addFile = (file, type) => {
    let acceptedFiles = this.state.acceptedFiles
    const acceptedFile = { file, type }
    acceptedFiles.push(acceptedFile)
    this.setState({ acceptedFiles })
  }

  addMandatoryFile = (file, type) => {
    this.addFile(file, type)
    this.setState({ showSupportDoc: true })
  }

  deleteFile = (file, type) => {
    let acceptedFiles = this.state.acceptedFiles
    remove(acceptedFiles, (f) => {
      return file === f
    })
    this.setState({ acceptedFiles })
  }

  renderUploadedFiles = (file) => {
    const f = file.file
    return (
      <p key={f.name}>{f.name} - {f.size} bytes
        <Button bsStyle='danger' bsClass='sm_btn'
          onClick={() => {
            this.deleteFile(file)
          }
        } >
          <i className='fa fa-times' aria-hidden='true' />
        </Button></p>
    )
  }

  submit = () => {
    const mfiles = this.getMandatoryFiles()
    const sfiles = this.getSupportingFiles()
    if (mfiles.length > 0 && sfiles.length > 0) {
      window.alert('You have successfully submitted all required files. Back Home now')
      this.props.router.push('/')
    } else {
      this.setState({ showErrorMessage: true })
    }
  }

  render () {
    const { firstName, lastName, address, suburb, postcode, dob, passport } = this.props.user
    const { supportFiles, mandatoryFiles } = this.props
    const { showErrorMessage } = this.state
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
            <h5>Please upload your Passport (Other countries) file</h5>
            <h6>(Format: png, pdf, jpeg)</h6>
            <FileUploadProgress type='mandatory' key='mandatory_form' id='f1'
              onDone={(file) => this.addMandatoryFile(file, 'mandatory')}
            />
          </Col>
        </Row>
        {<Row>
          <Col xs={6} xsPush={3}>
            <h4>Please upload your Support files</h4>
            <FileUploadProgress key='support_form' type='support' id='f2'
              onDone={(file) => this.addFile(file, 'support')}
            />
          </Col>
        </Row>}
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
}

export default Document
