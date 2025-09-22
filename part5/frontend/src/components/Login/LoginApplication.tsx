import React, { useState } from 'react';
import loginService, { type LoginResponse } from '../../services/login';
import Notification from '../Notification/Notification';
import LoginForm from './LoginForm';
import blogService from "../../services/blogs";

interface LoginApplicationProps {
  user: LoginResponse | null,
  setUser: React.Dispatch<React.SetStateAction<LoginResponse | null>>
}

const LoginApplication = ({user, setUser}: LoginApplicationProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => { setNotification(null) }, 5000);
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      showNotification('wrong credentials')
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
      <Notification message={notification} />

      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
      )}
    </div>
  );
}

export default LoginApplication;