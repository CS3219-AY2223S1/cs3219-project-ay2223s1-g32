import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./screens/SignupPage";
import LoginPage from "./screens/LoginPage";
import SelectDifficultyPage from "./screens/SelectDifficultyPage";
import MatchingPage from "./screens/MatchingPage";
import AccountSettings from "./screens/AccountSettings";
import MatchedPage from "./screens/MatchedPage";
import Collab from "./screens/Tpage";
import ChatPage from "./components/ChatPage";
import ChatPage2 from "./components/ChatPage2";
import { Box } from "@mui/material";
import React from "react";
import RequireAuth from "./useAuth";

function App() {
  return (
    <div className="App">
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/signup" />}
            ></Route>
            {/* <Route path="/homepage" element={<Homepage/>}/> */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account/settings" element={
              <RequireAuth>
                <AccountSettings />
              </RequireAuth>
            } />
            <Route
              path="/selectdifficulty"
              element={
                <RequireAuth>
                  <SelectDifficultyPage />
                </RequireAuth>
              } />
            <Route path="/matching" element={
              <RequireAuth>
                <MatchingPage />
              </RequireAuth>
            } />
            <Route path="/matched" element={
              <RequireAuth >
                <MatchedPage />
              </RequireAuth>
            } />
            <Route path="/testpage" element={
              <RequireAuth >
                <Collab />
              </RequireAuth>
            } />
            <Route path="/chatpage" element={
              <RequireAuth >
                <ChatPage />
              </RequireAuth>
            } />
            <Route path="/chatpage2" element={
              <RequireAuth >
                <ChatPage2 />
              </RequireAuth>
            } />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
