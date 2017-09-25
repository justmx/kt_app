import { assign, filter } from 'lodash'
import axios from 'axios'
// Constants
// ------------------------------------
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const REQUEST_FILE_UPLOAD = 'REQUEST_FILE_UPLOAD'
export const LOAD_RECEIVED = 'LOAD_RECEIVED'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'

export const uploadDocumentRequest = (fileInfo) => {
  console.log(fileInfo)
  let data = new FormData()
  const { file } = fileInfo
  console.log(file)
  data.append('file', file)
  // data.append('name', name)
  console.log(data)
  // data.append('name', name);

  return (dispatch) => {
    let instance = axios.create({
      baseURL: 'http://localhost:3000'
    })

    let config = {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded)
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        dispatch({
          type: 'LOAD_RECEIVED',
          percentCompleted
        })
      }
    }

    instance.post('/api/upload', file, config).then(response => {
      dispatch({ type: 'UPLOAD_FILE_SUCCESS',
        file: fileInfo
      })
    }).catch((error) => {
      dispatch({
        type: 'UPLOAD_FILE_FAILURE',
        error
      })
    })
  }
}

export const actions = {
  uploadDocumentRequest
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const handleSuccessUpload = (state, action) => {
  let acceptedFiles = state.acceptedFiles
  acceptedFiles.push(action.file)
  return {
    ...state,
    isLoading: false,
    percentCompleted: 100,
    acceptedFiles
  }
}

const ACTION_HANDLERS = {
  [UPLOAD_FILE_SUCCESS] : handleSuccessUpload,
  [UPLOAD_FILE_FAILURE] : (state, action) => { return assign({}, action.error, { isLoading: false }) },
  [REQUEST_FILE_UPLOAD] : (state, action) => { return assign({}, state, { isLoading: true }) },
  [LOAD_RECEIVED] : (state, action) => { return assign({}, state, action.percentCompleted) }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  percentCompleted: -1,
  error: '',
  acceptedFiles: []
}

export default function fileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export const mandatoryFiles = (state) => {
  return filter(state.file.acceptedFiles, (o) => { return o.type === 'mandatory' })
}

export const supportFiles = (state) => {
  return filter(state.file.acceptedFiles, (o) => { return o.type === 'support' })
}
