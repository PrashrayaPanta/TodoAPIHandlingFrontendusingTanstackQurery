import axios from "axios";

let baseURL = "https://api.freeapi.app/api/v1/todos";
export const postData = async (object) => {
  const response = await axios.post(baseURL, object);
  return response;
};

export const getAllTodos = async () => {
  const response = await axios.get(baseURL);

  return response;
};

export const updateTodo = async ({ id, title, description }) => {
  const response = await axios.patch(`${baseURL}/${id}`, {
    title,
    description,
  });

  console.log(response);
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);

  console.log(response);
};
