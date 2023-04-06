import logo from "../../assets/images/logo5.png";
import "./styles.scss";

const Header = () => {
  return (
    <>
      <header>
        <div className="background-icon">
          <img src={logo} alt="Logo de Rubieland" />
        </div>
        <div className="main-title">RubieLand</div>
      </header>
    </>
  );
};

export default Header;
