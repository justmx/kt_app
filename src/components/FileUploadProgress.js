import { EventEmitter } from 'events'
import React from 'react'
import PropTypes from 'prop-types'
import objectAssign from 'object-assign'
import axios from 'axios'

const styles = {
  progressWrapper: {
    height: '10px',
    marginTop: '10px',
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
    this.proxy = new EventEmitter()
    this.state = {
      progress: -1,
      hasError: false,
    }
  }

  cancelUpload = () => {
    this.proxy.emit('abort')
    this.setState({
      progress: -1,
      hasError: false,
    })
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
        <form id={id} style={{ marginBottom: '15px', marginTop: '30px' }}>
          <input style={{ display: 'block', alignSelf: 'center' }}
            type='file' accept='image/jpeg, image/png, application/pdf'
            name='file1' id='file1'
            onChange={onChange}
          />
        </form>
        {progressComponent}
      </div>
    )
  }

  onChange = (e) => {
    e.preventDefault()
    const files = e.target.files || e.dataTransfer.files
    this.setState({
      progress: 0,
      hasError: false,
    }, this._doUpload(files[0]))
  }

  render () {
    const progessElement = this.progressRenderer(
                            this.state.progress, this.state.hasError, this.cancelUpload)
    const formElement = this.formRenderer(this.onChange, progessElement, this.props.id)
    return (
      <div>
        {formElement}
      </div>
    )
  }

  _getFormData () {
    if (this.props.id) {
      return new FormData(document.getElementById(this.props.id))
    }
  }

  _doUpload (file) {
    const form = this._getFormData()
    let instance = axios.create({
      baseURL: this.props.url
    })

    let config = {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded)
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({ progress: percentCompleted })
      }
    }

    instance.post('/user', form, config).then(response => {
      const newState = { progress: 100 }
      this.setState(newState, () => {
        setTimeout(() => {
          this.props.onDone(file)
          document.getElementById(this.props.id).reset()
          this.setState({
            progress: -1
          })
        }, 3000)
      })
    }).catch(() => {
      this.setState({
        hasError: true
      })
    })
  }
}

FileUploadProgress.propTypes = {
  url: PropTypes.string.isRequired,
  onDone: PropTypes.func,
  id: PropTypes.string.isRequired
}

export default FileUploadProgress
