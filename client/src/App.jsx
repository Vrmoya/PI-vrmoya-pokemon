import LandingPage from "./components/LandingPage/LandingPage";
// import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
