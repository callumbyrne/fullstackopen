const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

let timeoutID

export const setNotification = (notification, timeout) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: null
      })
    }, (timeout * 1000));
  }
}

export default notificationReducer