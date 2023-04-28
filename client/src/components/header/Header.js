import { Link } from "react-router-dom";
import logo from "../../assets/images/logo5.png";
import "./styles.scss";

const Header = () => {
  return (
    <header>
      <div className="background-icon">
        <img src={logo} alt="Logo de Rubieland" />
      </div>
      <h1>
        <Link to="/" className="main-title">
          RubieLand
        </Link>
      </h1>
    </header>
  );
};

export default Header;
