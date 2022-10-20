import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SelectDifficultyPage from "./components/SelectDifficultyPage";
import MatchingPage from "./components/MatchingPage";
import {Box} from "@mui/material";
import React from 'react'

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/selectdifficulty" element={<SelectDifficultyPage />}/>
                        <Route path="/matching" element={<MatchingPage />} />
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
