import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const AdminMiddleware = (props) => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user && user.isAdmin) {
      setLoaded(true);
    }
    setLoading(false);
  }, [user]);

  if (!localStorage.getItem("jwt")) {
    return <Navigate to={"/login"} />;
  }
  switch (loaded && user.isAdmin) {
    case true:
      return props.children;

    default:
      return loading ? (
        <h2>Chargement de la page...</h2>
      ) : (
        <Navigate to={"/login"} />
      );
  }
};
