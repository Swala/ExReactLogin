import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ProjectService from "../services/project.service";

const CreateProject = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeDeadline = (e) => {
    const deadline = e.target.value;
    setDeadline(deadline);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    //form.current.validateAll();
    if (name && deadline && description) {
      ProjectService.create(name, deadline, description).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
    setName("");
    setDescription("");
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleCreate} ref={form} autoComplete="off">
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Project Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <Input
                  type="date"
                  className="form-control"
                  name="deadline"
                  value={deadline}
                  onChange={onChangeDeadline}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={onChangeDescription}
                />
              </div>
              <div className="form-group mt-3">
                <button className="btn btn-primary btn-block">Add</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
export default CreateProject;
