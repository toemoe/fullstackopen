import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '' },
  reducers: {
    setNotification: (state, action) => {
      return { message: action.payload }
    },
    clearNotification: () => {
      return { message: ''}
    }
  }
})


export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, time = 4) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => { dispatch(clearNotification()) }, time * 1000)
  }
}

export default notificationSlice.reducer