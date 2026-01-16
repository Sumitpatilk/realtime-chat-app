import React, { useState } from "react";

export default function Join({ setUsername }) {
  const [name, setName] = useState("");

  const joinChat = () => {
    if (name.trim()) {
      setUsername(name);
    }
  };

  return (
    <div>
      <h2>Join Chat</h2>
      <input
        placeholder="Enter username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={joinChat}>Join</button>
    </div>
  );
}
