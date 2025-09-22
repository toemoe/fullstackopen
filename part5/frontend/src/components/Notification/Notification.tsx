interface NotificationProps {
  message: string | null;
}

const Notification = ({message}: NotificationProps) => {
  if (message === null) {
      return null;
  }

  return (
      <div>
          <p>{message}</p>
      </div>
  )
}

export default Notification;