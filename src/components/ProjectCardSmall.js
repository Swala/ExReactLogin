//Card to use in project board columns
//contains header with name, deadline, and remove button for admin

import React from "react";

const ProjectCardSmall = ({ project }) => {
  const onClick = () => {
    console.log("I am clickable");
  };

  /* if (projects) {
    projects.map((project) => {
      if (project.flag.id === flag.id) {
        return (
          <div
            className="card projectCard"
            key={project.id}
            onClick={onClick}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <h5 className="card-title">{project.name}</h5>
              <p className="card-text">{project.deadline.substring(0, 10)}</p>
            </div>
          </div>
        );
      }
    });
  } else {
    return null;
  }*/

  return (
    <>
      {project ? (
        <div
          className="card projectCard"
          key={project.id}
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body">
            <h5 className="card-title">{project.name}</h5>
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
