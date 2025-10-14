import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const update = async (updatedAnecdote) => {
  console.log(updatedAnecdote);
  const response = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote,
  );
  return response.data;
};

const deleteById = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data.comments || [];
};

const addComment = async (id, text) => {
  const anecdoteRes = await axios.get(`${baseUrl}/${id}`);
  const updatedComments = [...(anecdoteRes.data.comments || []), { id: Date.now(), text }];
  const response = await axios.patch(`${baseUrl}/${id}`, { comments: updatedComments });
  return response.data.comments;
};


export default { getAll, createNew, update, deleteById, getComments, addComment };
