import { API } from "../Config";
import fetch from "isomorphic-fetch";


export const getAllBehaviour = () => {
  return fetch(`${API}/behaviour`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addTaskByBehaviour = (token, task) => {
  return fetch(`${API}/behaviour/addTodo`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const allTaskByBehaviour = (token,behaviourId) => {
  return fetch(`${API}/behaviour/Todos/${behaviourId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editTaskByBehaviour = (token, todoId, editedTodo) => {
  return fetch(`${API}/behaviour/Todos/${todoId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(editedTodo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteTaskById = (token, behaviourId, todoId) => {
  return fetch(`${API}/behaviour/Todos/${behaviourId}/${todoId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
