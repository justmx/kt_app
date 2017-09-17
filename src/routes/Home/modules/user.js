import assign from 'lodash/assign'
// Constants
// ------------------------------------
export const RECEIVE_USER = 'RECEIVE_USER'
export const REQUEST_USER = 'REQUEST_USER'


export const createUser = (data) => {
  const user = {user: data}
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_USER })
    // set api call here
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : RECEIVE_USER,
          user : user,
          isLoading: false
        })
        resolve()
      }, 300)
    })
  }
}

export const actions = {
  createUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_USER] : (state, action) => {return assign({}, state, action.user, {isLoading: action.isLoading})},
  [REQUEST_USER] : (state, action) => {return assign({}, state, {isLoading: true})}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
