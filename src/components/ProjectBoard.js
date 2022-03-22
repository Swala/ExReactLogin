//Home

import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import BoardService from "../services/board.service";

const ProjectBoard = () => {
  const [content, setContent] = useState("");
  const [flags, setFlags] = useState([]); //load from Flag service
  /*const board = {
    columns: {
      id: "",
      title: "",
      projects: [],
    },
  };*/

  useEffect(() => {
    UserService.getPublicContent().then(
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
    );
    BoardService.getFlags().then((response) => {
      setFlags(response.data);
    });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <div className="container">
          <div className="row">
            {flags.map((flag) => (
              <div className="col-md">{flag.name}</div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};
export default ProjectBoard;
