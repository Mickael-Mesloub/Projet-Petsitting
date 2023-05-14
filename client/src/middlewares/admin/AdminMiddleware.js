import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toastError } from "../../components/toast/Toast";

export const AdminMiddleware = (props) => {
  const [loaded, setLoaded] = useState(false);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (!user.isLogged) {
      setLoaded(false);
    } else {
      setLoaded(true);
    }
  }, [user]);

  if (!localStorage.getItem("jwt")) {
    return (
      toastError(
        "Vous devez être connecté(e) en tant qu'administrateur pour accéder à cette page !"
      ),
      (<Navigate to={"/login"} />)
    );
  }
  switch (loaded) {
    case true: {
      if (user.isAdmin) {
        return props.children;
      }
      return (
        toastError("Vous n'êtes pas autorisé(e) à consulter cette page !"),
        (<Navigate to={"/"} />)
      );
    }
    case false: {
      return <h2 text-align="center">Chargement...</h2>;
    }
    default:
      return <h2 text-align="center">Chargement...</h2>;
  }
};
