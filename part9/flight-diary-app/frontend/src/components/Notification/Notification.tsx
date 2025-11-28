
interface NotificationProps {
  message: string | null;
}

const Notification = ({message}: NotificationProps) => {
  if (!message) return null;

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;