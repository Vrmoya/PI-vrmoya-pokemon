import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom";
const NavBar = ({handleSearch}) => {
    return(
        <div>
            <Link to="/home"><span>Home</span></Link>
            <Link to="/create"><span>Create</span></Link>
            <SearchBar handleSearch={handleSearch} />
            
        </div>
    )
}

export default NavBar;