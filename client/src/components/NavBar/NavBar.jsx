import SearchBar from "../SearchBar/SearchBar"

const NavBar = ({handleSearch}) => {
    return(
        <div>
            <SearchBar handleSearch={handleSearch} />
            
        </div>
    )
}

export default NavBar;