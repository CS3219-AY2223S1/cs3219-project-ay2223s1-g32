import React from "react";
import axios from "axios";
import { Box } from "@mui/system";

function QuestionHistory() {
	const [userHistory, setUserHistory] = React.useState([]);
  React.useEffect(() => {
		// axios
		//   .get("http://localhost:8002/api/history/")
		//   .then((resp) => setUserHistory(resp.data[1]));
		axios
		  .get("http://localhost:8005/api/history/")
		  .then((resp) => {
				console.log("line 13" + JSON.stringify(resp.data));
				setUserHistory(resp.data);
			});
	}, []);

	const organizeData = () => {
		return userHistory.map((hist, index) => {
			return (
				<Box sx={{
					border: 1,
					borderColor: "#000",
					padding: "10px",
					marginBottom: "10px",
					width: "100vh"
					}}>
					<p>Question: {hist["question"]}.</p>
					<p>Answered on: {hist["updatedAt"].slice(0,10)}</p>
					<p>Your answer:</p>
					<Box sx={{
					backgroundColor: "#eee",
					padding: "10px",
					marginBottom: "10px",
					width: "95vh"
					}}>
						<p>{hist["content"]}</p>
					</Box>
				</Box>
			);
		});
	}

	return (
		<div>{organizeData()}</div>
	);
};

export default QuestionHistory;