import { io } from "socket.io-client";

import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";

const socket = io("http://localhost:3001/", {});

class Collab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "" };
    socket.on("receive code", (payload) => {
      this.updateCodeInState(payload);
    });
  }

  updateCodeInState(payload) {
    console.log(payload.code);
    this.setState({ code: payload.code });
  }

  codeIsHappening(newCode) {
    socket.emit("coding event", {
      code: newCode,
      roomID: 1,
    });
  }

  componentDidMount() {
    socket.emit("room", { roomID: 1 });
  }
  // componentWillReceiveProps(nextProps) {
  //   socket.emit("room", { roomID: 1 });
  // }

  componentWillUnmount() {
    socket.emit("leave room", {
      roomID: 1,
    });
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: "javascript",
      theme: "monokai",
    };
    return (
      <div>
        <h1>{"Title"}</h1>
        <p>{"Description"}</p>
        <CodeMirror
          value={this.state.code}
          options={options}
          height="200px"
          theme={dracula}
          onChange={this.codeIsHappening.bind(this)}
          // onBeforeChange={(editor, data, value) => {
          //   this.setState({ value });
          // }}
          // onChange={(editor, data, value) => {}}
        />
      </div>
    );
  }
}

export default Collab;
