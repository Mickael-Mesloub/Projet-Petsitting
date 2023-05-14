import { Navigate } from "react-router-dom";
import { toastError } from "../../components/toast/Toast";

export const ProfileMiddleware = (props) => {
  if (!localStorage.getItem("jwt")) {
    return (
      toastError("Vous devez être connecté(e) pour accéder à cette page !"),
      (<Navigate to={"/login"} />)
    );
  }

  return <>{props.children}</>;
};
