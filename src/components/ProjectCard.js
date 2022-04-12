import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/project.service";
//import ApproveModal from "./ApproveModal";
import BoardService from "../services/board.service";

const ProjectCard = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [project, setProject] = useState({});
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState(""); //use a modal instead?

  const [flags, setFlags] = useState([]);

  //const [modal, setModal] = useState(false);
  //const Toggle = () => setModal(!modal);

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

  useEffect(() => {
    BoardService.getFlags().then((response) => {
      setFlags(response.data);
    });
  }, []);

  function deleteProject() {
    console.log("delete: " + project.id);
    ProjectService.deleteProject(project.id).then(
      (response) => {
        //setMessage(response.data.message);
        //setSuccessful(true);
        navigate("/projectboard");
        window.location.reload();
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
          className="btn btn-danger w-25"
          onClick={deleteProject}
        >
          Delete
        </button>
      );
    } else {
      return null;
    }
  };

  const moveToNextFlag = () => {
    if (project.flag === "COMPLETED") {
      alert("Project is in final stage");
    } else {
      flags.forEach((flag) => {
        console.log(flag.name);
        if (project.flag === flag.name) {
          //TODO check for _ in In_Progress
          updateFlag(flag.id);
        }
      });
    }
  };

  const updateFlag = (flagId) => {
    const newFlagId = flagId + 1;
    //console.log(newFlagId);
    ProjectService.updateProject(
      project.id,
      project.name,
      project.deadline,
      project.description,
      newFlagId
    ).then((response) => {
      setProject(response.data);
    });
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
      <h3 className="text-center mb-4">Project Details</h3>
      <div className="table-responsive border border-dark rounded overflow-hidden">
        <table className="table table-bordered border-dark">
          <thead>
            <tr className="table-dark">
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
              <div className="border border-dark rounded m-3 p-2">
                <h6>Description</h6>
                <p>{project.description}</p>
              </div>
            </div>
            <div className="d-flex align-items-center flex-column mt-3">
              <button type="button" className="btn btn-primary mb-2 w-25">
                Edit
              </button>
              <DeleteIfAdmin />
            </div>
          </div>
          <div className="text-center mt-5 mb-5">
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={() => moveToNextFlag()}
              /* onClick={() => Toggle()}*/
            >
              Approve/Finish
            </button>
          </div>
          {/* <ApproveModal show={modal} />
          Modal not rendering*/}
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
