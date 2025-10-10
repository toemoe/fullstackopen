import { useNotification } from "../context/NotificationContext"

const Notification = () => {
  const [notification] = useNotification()

  if (!notification.message) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
