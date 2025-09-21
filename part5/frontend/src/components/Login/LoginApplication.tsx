const LoginApplication = () => {
  const [username, setUsername] = useState('');
  return (
    <div>
      <h1>Login Application</h1>
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
    </div>
  );
}

export default LoginApplication;