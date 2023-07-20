import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Additem from "./Components/Additem";
import Recipes from "./Components/Recipes";
import { GlobalProvider } from "./GlobalState";
import Fridge from "./Components/Fridge";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/additem" element={<Additem />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
