import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export const ProfileMiddleware = (props) => {
  const { user } = useSelector((state) => state);
  const { userId } = useParams();

  if (!localStorage.getItem("jwt")) {
    return <Navigate to={"/login"} />;
  }
  return <>{user && user._id === userId && <>{props.children}</>}</>;
};
