import { Navigate, useParams } from "react-router-dom";

export const ProfileMiddleware = (props) => {
  if (!localStorage.getItem("jwt")) {
    return <Navigate to={"/login"} />;
  }

  return <>{props.children}</>;
};
