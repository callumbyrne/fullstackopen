const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

let timeoutID

export const setNotification = (message, timeout, type = 'success') => {
  return (dispatch) => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        type,
      },
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: null,
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
