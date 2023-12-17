import { useEffect, useState } from "react";
import "./App.css";
var W3CWebSocket = require("websocket").w3cwebsocket;

function App() {
  const [newMessage, setNewMessage] = useState([]);
  const [type, setType] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const client = new W3CWebSocket("ws://localhost:4000/");

    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      console.log("message came");
      updateMessageList(message.data);
      console.log(message.data, "message");
    };
    client.onerror = function () {
      console.log("Connection Error");
    };

    setWs(client);
  }, [newMessage]);

  function sendMessageToback(msg) {
    if (ws) {
      ws.send(msg);
    }
  }

  function updateMessageList(msgtset) {
    let msgList = [...newMessage, msgtset];
    setNewMessage(msgList);
  }

  return (
    <div className="App">
      <h1>{type}</h1>
      <input
        onChange={(e) => {
          setType(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessageToback(type);
        }}>
        Send
      </button>
      {newMessage.map((mes, index) => {
        return (
          <div key={index}>
            <h1>{mes}</h1>;
          </div>
        );
      })}
    </div>
  );
}

export default App;
