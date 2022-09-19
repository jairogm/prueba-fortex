//React
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Compoenents
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

//Services
import AuthService from "./services/auth/authService";

//Material UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//styles
import "./App.css";
import GroupProvider from "./context/GroupContext";


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      {currentUser && (
        <Box className="logout__btn">
          <Button color="inherit" variant="contained" onClick={logOut}>
            logOut
          </Button>
        </Box>
      )}
      <Box>
        <Routes>
          <Route
            path="/home"
            element={
              currentUser ? (
                <GroupProvider>
                  <Home />
                </GroupProvider>
              ) : (
                <Login />
              )
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
