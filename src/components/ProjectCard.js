import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/project.service";

const ProjectCard = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [project, setProject] = useState();

  useEffect(() => {
    //console.log(params.id);

    //fetch project using param (project id)
    ProjectService.getProject(params.id).then((response) => {
      setProject(response.data);
    });
  }, []);

  return (
    <>
      <div>
        <button
          className="btn btn-secondary btn-block mt-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
        <h1>Project details</h1>
      </div>
    </>
  );
};

export default ProjectCard;
