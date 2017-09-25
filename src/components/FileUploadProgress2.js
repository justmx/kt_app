import { EventEmitter } from 'events'
import React from 'react'
import PropTypes from 'prop-types'
import objectAssign from 'object-assign'
import axios from 'axios'

const styles = {
  progressWrapper: {
    height: '10px',
    marginTop: '10px',
    marginLeft: '5px',
    width: '400px',
    float: 'left',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '80%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#337ab7',
    WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease',
  },
  cancelButton: {
    marginTop: '5px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)',
    opacity: '.2',
  },
}

class FileUploadProgress extends React.Component {
  constructor (props) {
    super(props)
  }

  cancelUpload = () => {
    // this.proxy.emit('abort')
    // this.setState({
    //   progress: -1,
    //   hasError: false,
    // })
  }

  progressRenderer = (progress, hasError, cancelHandler) => {
    if (hasError || progress > -1) {
      const barStyle = objectAssign({}, styles.progressBar)
      barStyle.width = `${progress}%`

      let message = (<span>Uploading ...</span>)
      if (hasError) {
        barStyle.backgroundColor = '#d9534f'
        message = (<span style={{ color: '#a94442' }}>Failed to upload ...</span>)
      }
      if (progress === 100) {
        message = (<span >Successfully uploaded</span>)
      }

      return (
        <div>
          <div style={styles.progressWrapper}>
            <div style={barStyle} />
          </div>
          <button
            style={styles.cancelButton}
            onClick={cancelHandler} />
          <div style={{ clear: 'left' }}>
            {message}
          </div>
        </div>
      )
    }
    return ''
  }

  formRenderer = (onChange, progressComponent, id) => {
    return (
      <div>
        <input style={{ display: 'block', alignSelf: 'center' }}
          type='file' accept='image/jpeg, image/png, application/pdf'
          name='file1' id={id}
          onChange={onChange}
        />
        {progressComponent}
      </div>
    )
  }

  onChange = (e) => {
    e.preventDefault()
    const files = e.target.files || e.dataTransfer.files
    console.log(files[0])
    const { type } = this.props
    this.props.uploadDocumentRequest({
      file: files[0],
      type
    })
  }

  render () {
    console.log()
    const { percentCompleted, error, acceptedFiles } = this.props.file
    acceptedFiles && acceptedFiles[0] && console.log(acceptedFiles[0].file)
    const progessElement = this.progressRenderer(
                            percentCompleted, error, this.cancelUpload)
    const formElement = this.formRenderer(this.onChange, progessElement, this.props.id)
    return (
      <div>
        {formElement}
      </div>
    )
  }
}

FileUploadProgress.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  file: PropTypes.object,
  uploadDocumentRequest: PropTypes.func
}

export default FileUploadProgress
