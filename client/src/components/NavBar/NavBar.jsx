import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Style from "./NavBar.module.scss";
import Logo from '../../assets/pokemon.svg'

const NavBar = ({ handleSearch }) => {
  return (
    <div className={Style.envelop}>
       
      <div className={Style.Container}>
      <div className={Style.logoContainer}>
                <img src={Logo} alt='Pokemon Logo' className={Style.logo}/>
            </div>
        <div>
          <SearchBar className={Style.searchBar} handleSearch={handleSearch} />
        </div>

        <Link to="/home" className={Style.button}>
          <span>Home</span>
        </Link>
        <Link to="/create" className={Style.button}>
          <span>Create</span>
        </Link>
      <div>
        <Link to="/">
          <button className={Style.button}>Logout</button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default NavBar;
