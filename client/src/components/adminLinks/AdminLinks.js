import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";

const AdminLinks = () => {
  return (
    <div className="admin-links-container">
      <Link to="/admin" className="admin-link">
        Dashboard
      </Link>
      <Link to="/admin/news" className="admin-link">
        News
      </Link>
      <Link to="/admin/users" className="admin-link">
        Utilisateurs
      </Link>
      <Link to="/admin/animals" className="admin-link">
        Animaux
      </Link>
      <Link to="/admin/services" className="admin-link">
        Services
      </Link>
      <Link to="/admin/bookings" className="admin-link">
        Réservations
      </Link>
    </div>
  );
};

export default AdminLinks;
