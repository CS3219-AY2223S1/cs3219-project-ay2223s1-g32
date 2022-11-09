import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopNavBar from "../components/navBar/TopNavBar";
import * as Components from "../components/selectDifficulty/Components";
import "../components/selectDifficulty/styles.css";

export default function BasicSelect() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = React.useState("Easy");
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const [isValidUser, setIsValidUser] = React.useState(false);

  React.useEffect(() => {
    if (document.cookie.split('; ').find((row) => row.startsWith('userAuthed=')) != 'false') {
      console.log("user authed is not false");
      console.log(JSON.stringify(document.cookie));
      setIsValidUser(true);
    }
  }, []);

  const handleChange = (event) => {
    setDifficulty(event.target.value);
    console.log(event.target.value);
  };

  const confirmButton = () => {
    navigate("/matching", { state: { difficulty: difficulty } });
  }

  if (!isValidUser) {
    return (
      <h1>Page not found</h1>
    );
  } else {
    return (
      <>
        <TopNavBar />
        <Components.Container>
          <Components.Title style={{ marginTop: 40, marginBottom: 40, fontSize: 28, alignSelf: 'center' }}>Select your difficulty: </Components.Title>
          <Box sx={{ minWidth: 120, alignItems: 'center' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                label="Difficulty"
                onChange={handleChange}
              >
                <MenuItem value={"Easy"}>Easy</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Difficult"}>Difficult</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Components.GhostButton style={{ alignSelf: 'center' }} onClick={confirmButton}>
            Confirm choice
          </Components.GhostButton>
          {/* <Button onClick={confirmButton} style={{ width: 100, marginTop: 10 }}>Confirm</Button> */}
        </Components.Container>
      </>
    );
  }
}
