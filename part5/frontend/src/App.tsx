import BlogsContainer from "./components/Blogs/BlogsContainer";
import LoginApplication from "./components/Login/LoginApplication";
import type { LoginResponse } from './services/login';
import { useState, useEffect } from "react";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState<LoginResponse | null>(null);

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

  return (
    <>
    <LoginApplication user={user} setUser={setUser} />
    {user && <BlogsContainer user={user} />}
    </>
  )
}

export default App