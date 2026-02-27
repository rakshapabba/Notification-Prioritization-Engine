import React, { useEffect, useState } from "react";
import { getNotifications, addNotification } from "./services/notificationService";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("HIGH");

  useEffect(() => {
    getNotifications()
      .then(data => setNotifications(data))
      .catch(err => console.error("Error fetching notifications:", err));
  }, []);

  const handleAdd = () => {
    addNotification({ message, priority })
      .then(newNote => setNotifications([...notifications, newNote]))
      .catch(err => console.error("Error adding notification:", err));
    setMessage(""); // clear input after adding
  };

  return (
    <div className="App">
      <h1>Notifications</h1>

      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LOW">LOW</option>
        </select>
        <button onClick={handleAdd}>Add Notification</button>
      </div>

      <ul>
        {notifications.map(n => (
          <li key={n.id}>
            {n.message} ({n.priority})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;