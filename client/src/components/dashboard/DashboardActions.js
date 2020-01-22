import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <FontAwesomeIcon
          icon="faUserCircle"
          className="text-primary"
        ></FontAwesomeIcon>{" "}
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <FontAwesomeIcon
          icon="faBlackTie"
          className="text-primary"
        ></FontAwesomeIcon>{" "}
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <FontAwesomeIcon
          icon="faGraduationCap"
          className="text-primary"
        ></FontAwesomeIcon>{" "}
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
