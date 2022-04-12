//Card to use in project board columns
//contains header with name, deadline, and remove button for admin

import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const ProjectCardSmall = ({ project }) => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  return (
    <>
      {project ? (
        <div
          className="card projectCard"
          key={project.id}
          onClick={() => navigate("/project/" + project.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body">
            <h6 className="card-title">{project.name}</h6>
            <p className="card-text">{project.deadline.substring(0, 10)}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProjectCardSmall;

/*{projects
    ? projects.map(
        (
            project //check match here? if(project.flag.id === flag.id)
        ) => (
            <div
                className="card projectCard"
                key={project.id}
                onClick={onClick}
                style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">
                  {project.deadline.substring(0, 10)}
                </p>
              </div>
            </div>
        )
    )
    : null}*/
