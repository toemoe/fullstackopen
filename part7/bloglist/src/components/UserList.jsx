import { Link } from "react-router-dom";

const UserList = ({ users = [] }) => {
  if (!users || users.length === 1) return <div>Loading...</div>;

  return (
    <>
      <h2>User List</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Name
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Blogs Created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {user.anecdotes.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
