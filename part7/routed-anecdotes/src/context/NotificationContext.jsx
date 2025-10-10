import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { message: action.payload }
    case 'REMOVE':
      return { message: null }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { message: null })

  return (
    <NotificationContext.Provider value={[state, dispatch]} >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export default NotificationContext