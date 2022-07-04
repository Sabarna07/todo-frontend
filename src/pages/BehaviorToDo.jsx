import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import {
  addTaskByBehaviour,
  allTaskByBehaviour,
  deleteTaskById,
  editTaskByBehaviour,
} from "../actions";
import { toast } from "react-toastify";
import TaskModal from "../components/TaskModal";
import { getCookie } from "../actions/auth";
import {BarLoader} from 'react-spinners'

const BehaviorToDo = () => {
  const { name } = useParams();
  const location = useLocation();
  const behaviour = location.state.id;
  const token = getCookie("token");

  const [values, setValues] = useState({
    todoName: "",
    todoDetails: "",
    todoId: "",
    loading: false,
    tasks: "",
  });

  const { todoName, todoDetails, todoId, loading, tasks } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, laoding: false });
  };

  const init = () => {
    allTaskByBehaviour(token, behaviour).then((data) => {
      if (data.error) {
        // error
        toast.error("Can't add todo");
      } else {
        setValues({ ...values, tasks: data.data });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);


  const handleTaskSubmit = (e) => {
    e.preventDefault();
    setValues({...values, loading : true})
    addTaskByBehaviour(token, { behaviour, todoName, todoDetails }).then(
      (data) => {
        if (data.error) {
          // error
          toast.error("Can't add todo");
        } else {
          // success message
          toast.success(data.message);
          setValues({
            ...values,
            todoName: "",
            todoDetails: "",
            loading: false,
          });
          init();
        }
      }
    );
  };

  const handleEditTask = (item) => {
    setValues({
      ...values,
      todoName: item.todoName,
      todoDetails: item.todoDetails,
      loading: false,
      todoId: item._id
    });
  };

  const handleEditTaskSubmit = (e) => {
    e.preventDefault();
    setValues({...values, loading : true})
    editTaskByBehaviour(token, todoId, { todoName, todoDetails }).then(
      (data) => {
        if (data.error) {
          // error
          toast.error("Can't edit todo");
        } else {
          // success message
          toast.success(data.message);
          clearState();
          init();
        }
      }
    );
  };

  const clearState = () => {
    setValues({ ...values, todoName: "", todoDetails: "", loading: false });
  };

  // delete task
  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once delete not gonna retrive it",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        setValues({ ...values, loading: true });
        deleteTaskById(token, behaviour, id).then((data) => {
          if (data.error) {
            setValues({ ...values, loading: false });
            toast.error("Something went wrong");
          } else {
            setValues({ ...values, loading: false });
            Swal.fire("Task deleted successfully", "", "success");
            init();
          }
        });
      } else {
        Swal.fire("Task not delete", "", "warning");
      }
    });
  };

  // list task
  const listTask = () => {
    return (
      <>
        {tasks &&
          tasks.Todo.map((item) => (
            <div
              className="accordion mb-4"
              id="accordionExample"
              key={item._id}
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${item._id}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item._id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${item._id}`}
                  >
                    <h5 className="m-0">{item.todoName}</h5>
                    <label className="icons">
                      {/* Edit button */}
                      <span
                        className="mx-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editTaskModal"
                        onClick={() => handleEditTask(item)}
                      >
                        <img src="/images/edit.svg" alt="" />
                      </span>

                      {/* Delete button */}
                      <span
                        onClick={() => deleteTask(item._id)}
                        className="mx-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <img src="/images/wrong.svg" alt="" />
                      </span>
                    </label>
                  </button>
                </h2>
                <div
                  id={`collapse${item._id}`}
                  className="accordion-collapse collapse hide"
                  aria-labelledby={`heading${item._id}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">{item.todoDetails}</div>
                </div>
              </div>
            </div>
          ))}
        {/* Edit task modal */}
        {
          <TaskModal
            modalId={"editTaskModal"}
            clearState={clearState}
            name={name}
          >
            <form className="w-100 position-relative" onSubmit={handleEditTaskSubmit}>
              {loading && loader()}
              <div className="mb-3">
                <label className="form-label">Todo Name</label>
                <input
                  value={todoName}
                  onChange={handleChange("todoName")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Todo Details</label>
                <textarea
                  value={todoDetails}
                  onChange={handleChange("todoDetails")}
                  rows={6}
                  type="text"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </TaskModal>
        }
      </>
    );
  };

  const loader = () =>{
    return(
      <div className="loader">
        <BarLoader color="#062af0" size={20}/>
      </div>
    )
  }

  return (
    <Layout>
      <div className="container mt-6">
        <h1 className="text-center py-4">{name}</h1>
        <button
          type="button"
          className="btn btn-primary my-3"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
        >
          Add Task
        </button>
        <TaskModal
          modalId={"addTaskModal"}
          clearState={clearState}
          name={name}
        >
          <form className="w-100 position-relative" onSubmit={handleTaskSubmit}>
          {loading && loader()}
            <div className="mb-3">
              <label className="form-label">Todo Name</label>
              <input
                value={todoName}
                onChange={handleChange("todoName")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Todo Details</label>
              <textarea
                value={todoDetails}
                onChange={handleChange("todoDetails")}
                rows={6}
                type="text"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </TaskModal>

        {/* list task */}
        {listTask()}
      </div>
    </Layout>
  );
};

export default BehaviorToDo;
