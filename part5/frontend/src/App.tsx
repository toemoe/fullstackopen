import BlogsContainer from './components/Blogs/BlogsContainer'
import LoginApplication from './components/Login/LoginApplication'
import type { LoginResponse } from './services/login'
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification/Notification'


const App = () => {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      setUser(null)
    }
  }, [])

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <>
      <Notification message={notification} />
      <LoginApplication user={user} setUser={setUser} showNotification={showNotification}/>
      {user && <BlogsContainer user={user} showNotification={showNotification}/>}
    </>
  )
}

export default App