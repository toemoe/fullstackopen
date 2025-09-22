
interface LoginFormProps {
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => void
  setUsername: (username: string) => void
  setPassword: (password: string) => void
  username: string
  password: string
}

const LoginForm = ({handleLogin, setUsername, setPassword, username, password}: LoginFormProps) => {
  return (
    <>
    <form onSubmit={handleLogin}>
      <div>
        <label>username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </label>
      </div>
      <div>
          <label>password
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </label>
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )
}

export default LoginForm