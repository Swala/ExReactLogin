//Home

import React, { useState, useEffect } from "react";
//import UserService from "../services/user.service";
import BoardService from "../services/board.service";
import ProjectCardSmall from "./ProjectCardSmall";

const ProjectBoard = () => {
  //const [content, setContent] = useState("");
  const [flags, setFlags] = useState([]); //load from Flag service
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //used for testing
    /*UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );*/
    BoardService.getFlags().then((response) => {
      setFlags(response.data);
    });
    BoardService.getProjects().then((response) => {
      setProjects(response.data);
    });
  }, []);

  const matchProjectWithFlag = (flag) => {
    return projects.map((project) => {
      if (flag && flag.id === project.flag.id) {
        //console.log("match");
        return <ProjectCardSmall project={project} key={project.id} />;
      } else {
        return null;
      }
    });
  };

  return (
    <div className="container">
      <h3 className="text-center mt-2">Project Board</h3>
      <div className="container">
        <div className="row">
          {flags.map((flag) => (
            <div className="col border border-dark rounded m-1" key={flag.id}>
              <div className="col-content text-center">{flag.name}</div>
              {matchProjectWithFlag(flag)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectBoard;
