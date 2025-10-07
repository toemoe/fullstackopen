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
export default notificationSlice.reducer