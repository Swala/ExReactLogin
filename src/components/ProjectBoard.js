//Home

import React, { useState, useEffect } from "react";
//import UserService from "../services/user.service";
import BoardService from "../services/board.service";
import ProjectCardSmall from "./ProjectCardSmall";
import { useNavigate } from "react-router-dom";

const ProjectBoard = () => {
  //const [content, setContent] = useState("");
  const [flags, setFlags] = useState([]); //load from Flag service
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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
    BoardService.getFlags().then(
      (response) => {
        setFlags(response.data);
      },
      (error) => {
        console.log(error.message);
        if (error) {
          navigate("/login");
        }
      }
    );
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
            <div
              className="col border border-dark rounded m-1 bg-info"
              key={flag.id}
            >
              <div className="col-content text-center ">
                <h5>{flag.name}</h5>
              </div>
              {matchProjectWithFlag(flag)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectBoard;
