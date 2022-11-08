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
import { Box, fabClasses, useIsFocusVisible } from "@mui/material";
import React, {
  useEffect,
} from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuthToken: false
    };
  };

  componentDidMount() {
    const userAuthToken = document.cookie.split('; ').find((row) => row.startsWith('userAuthed=')).split('=')[1];
    if (userAuthToken == 'true') {
      this.setState({
        userAuthToken: true
      })
    } else {
      this.setState({
        userAuthToken: false
      })
    }
    console.log("AUTH NOW = " + this.state.userAuthToken);
  }
  render() {
    return (
      <div className="App" >
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
              {this.state.userAuthed ? (
                <Route path="/account/settings" element={
                  <AccountSettings />
                } />) : null}
              {this.state.userAuthed ? (
                <Route path="/selectdifficulty" element={
                  <SelectDifficultyPage />
                } />) : null}
              {this.state.userAuthed ? (
                <Route path="/matching" element={
                  <MatchingPage />
                } />) : null}
              {this.state.userAuthed ? (
                <Route path="/matched" element={
                  <MatchedPage />
                } />) : null}
              {this.state.userAuthed ? (
                <Route path="/testpage" element={
                  <Collab />
                } />) : null}
              {this.state.userAuthed ? (
                <Route path="/chatpage" element={
                  <ChatPage />
                } />) : null}
              {this.state.userAuthed ? (
                <Route path="/chatpage2" element={
                  <ChatPage2 />
                } />) : null}
            </Routes>
          </Router>
        </Box>
      </div>
    );
  }
}

export default App;
