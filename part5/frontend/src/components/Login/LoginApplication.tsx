import React, { useState } from 'react'
import loginService, { type LoginResponse } from '../../services/login'
import LoginForm from './LoginForm'
import blogService from '../../services/blogs'

interface LoginApplicationProps {
  user: LoginResponse | null,
  setUser: React.Dispatch<React.SetStateAction<LoginResponse | null>>
  showNotification: (message: string) => void
}

const LoginApplication = ({ user, setUser, showNotification }: LoginApplicationProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('logging in with', username)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Welcome, ${user.name}`)
    } catch {
      showNotification('Wrong username or password')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }

  return (
    <div>
      <h1>Login Application</h1>

      {user ? (
        <>
          <p>name: {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
      )}
    </div>
  )
}

export default LoginApplication