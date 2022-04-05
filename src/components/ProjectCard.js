import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/project.service";

const ProjectCard = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [project, setProject] = useState({});
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    //fetch project using param (project id)
    const fetchData = async () => {
      ProjectService.getProject(params.id).then((response) => {
        setProject(response.data);
      });
    };
    fetchData().catch(console.error);
    if (localStorage.getItem("user").includes("ROLE_ADMIN")) {
      setIsAdmin(true);
    }
  }, [params.id]);

  function deleteProject() {
    console.log("delete: " + project.id);
    ProjectService.deleteProject(project.id).then(
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

  const DeleteIfAdmin = () => {
    if (isAdmin) {
      return (
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteProject}
        >
          Delete
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <button
        className="btn btn-secondary btn-block mt-3"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
      <h3>Project details</h3>
      <div className="table-responsive border border-dark rounded">
        <table className="table table-bordered border-dark">
          <thead>
            <tr className="table-primary">
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Deadline</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{project.name}</th>
              <th scope="row">{project.id}</th>
              <th scope="row">{project.deadline}</th>
              <th scope="row">ToDo</th>
              <th scope="row">{project.flag}</th>
            </tr>
          </tbody>
        </table>
        <div>
          <div className="row row-cols-2">
            <div className="col">
              <div className="border border-dark rounded">
                <h6>Description</h6>
                <p>{project.description}</p>
              </div>
            </div>
            <div className="d-flex align-items-center flex-column">
              <button type="button" className="btn btn-primary mb-2">
                Edit
              </button>
              <DeleteIfAdmin />
            </div>
          </div>
        </div>
      </div>
      {message && (
        <div>
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
    </div>
  );
};

export default ProjectCard;
