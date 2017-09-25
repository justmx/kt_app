import { assign, filter, remove } from 'lodash'
import axios from 'axios'
// Constants
// ------------------------------------
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const REQUEST_FILE_UPLOAD = 'REQUEST_FILE_UPLOAD'
export const LOAD_RECEIVED = 'LOAD_RECEIVED'
export const LOAD_RESET = 'LOAD_RESET'
export const REMOVE_FILE = 'REMOVE_FILE'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'
export const RESET_FILES = 'RESET_FILES'

export const uploadDocumentRequest = (fileInfo) => {
  const { file } = fileInfo
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

export const deleteFile = (file) => {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_FILE',
      file
    })
  }
}

export const resetLoading = () => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_RESET' })
  }
}

export const resetFiles = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_FILES' })
  }
}

export const actions = {
  uploadDocumentRequest,
  resetLoading,
  deleteFile,
  resetFiles
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

const handleRemoveFile = (state, action) => {
  let acceptedFiles = state.acceptedFiles
  remove(acceptedFiles, (f) => {
    return action.file === f
  })
  return {
    ...state,
    acceptedFiles
  }
}

const ACTION_HANDLERS = {
  [UPLOAD_FILE_SUCCESS] : handleSuccessUpload,
  [UPLOAD_FILE_FAILURE] : (state, action) => { return assign({}, action.error, { isLoading: false }) },
  [REQUEST_FILE_UPLOAD] : (state, action) => { return assign({}, state, { isLoading: true }) },
  [LOAD_RECEIVED] : (state, action) => { return assign({}, state, action.percentCompleted) },
  [LOAD_RESET]: (state, action) => { return assign({}, state, { percentCompleted: -1 }) },
  [REMOVE_FILE]: handleRemoveFile,
  [RESET_FILES]: (state, action) => { return initialState }
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
