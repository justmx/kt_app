import assign from 'lodash/assign'
import axios from 'axios'
// Constants
// ------------------------------------
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const REQUEST_FILE_UPLOAD = 'REQUEST_FILE_UPLOAD'
export const LOAD_RECEIVED = 'LOAD_RECEIVED'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'

export const uploadDocumentRequest = ({ file, name }) => {
  let data = new FormData()
  data.append('file', document)
  data.append('name', name)
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

    instance.post('/api/upload', data, config).then(response => {
      dispatch({ type: 'UPLOAD_FILE_SUCCESS' })
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
const ACTION_HANDLERS = {
  [UPLOAD_FILE_SUCCESS] : (state, action) => { return assign({}, { isLoading: false, percentCompleted: 100 }) },
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
  error: ''
}

export default function fileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
