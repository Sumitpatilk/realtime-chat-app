import React, { useEffect, useState } from "react";
import socket from "../socket";

export default function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join", username);

    socket.on("history", (history) => {
      setMessages(history);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("history");
      socket.off("message");
    };
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      sender: username,
      text: text,
      time: new Date().toLocaleTimeString()
    });

    setText("");
  };

  return (
    <div>
      <h2>Chat Room</h2>

      <div style={{ border: "1px solid black", height: 300, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.sender}</b>: {m.text} <small>{m.time}</small>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
