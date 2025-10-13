import axios from "axios";

const baseUrl = "http://localhost:3001/users";

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createUser = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const updateUser = async (updatedAnecdote) => {
  console.log(updatedAnecdote);
  const response = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote,
  );
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAllUsers, createUser, updateUser, deleteUser };
