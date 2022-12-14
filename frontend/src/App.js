import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserAuthPage from "./screens/UserAuthPage";
import SelectDifficultyPage from "./screens/SelectDifficultyPage";
import MatchingPage from "./screens/MatchingPage";
import AccountSettings from "./screens/AccountSettings";
import MatchedPage from "./screens/MatchedPage";
import Collab from "./screens/Tpage";
import ChatPage from "./components/ChatPage";
import ChatPage2 from "./components/ChatPage2";
import { Box } from "@mui/material";
import React from "react";

function App() {
  const [isValidUser, setIsValidUser] = React.useState(false);

  React.useEffect(() => {
    console.log("in useeffect");
    if (document.cookie.split('; ').find((row) => row.startsWith('userAuthed=')) != 'false') {
      console.log("user authed is not false");
      console.log(JSON.stringify(document.cookie));
      setIsValidUser(true);
    }
  }, []);

  return (
    <div className="App">
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Router>
          <Routes>
            <Route
              exact path="/"
              element={isValidUser ? <Navigate replace to="/selectdifficulty" /> : <Navigate replace to="/register-login?" />}
            />
            <Route path="/register-login" element={<UserAuthPage />} />
            <Route path="/account/settings" element={<AccountSettings />} />
            <Route
              path="/selectdifficulty"
              element={<SelectDifficultyPage />}
            />
            <Route path="/matching" element={<MatchingPage />} />
            <Route path="/matched" element={<MatchedPage />} />
            <Route path="/testpage" element={<Collab />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
