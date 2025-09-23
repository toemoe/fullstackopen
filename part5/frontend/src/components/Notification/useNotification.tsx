import { useState } from 'react'

export const useNotification = () => {
  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => { setNotification(null) }, 5000)
  }

  return { notification, showNotification }
}