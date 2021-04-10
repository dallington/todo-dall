import React from "react";
import { useParams } from "react-router-dom";

const Project = () => {
  const { project } = useParams<{ project: string }>();
  return (
    <div>
      <h3>{project}</h3>
    </div>
  );
};

export default Project;
