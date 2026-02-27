import React, { useEffect, useState } from "react";
import { getNotifications, addNotification, classifyNotification, getAudit } from "./services/notificationService";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getNotifications()
      .then((data) => {
        console.log("Fetched notifications:", data);
        setNotifications(data);
      })
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  const handleAdd = () => {
    if (!newMessage.trim()) return;

    addNotification({
      userId: 101,
      message: newMessage,
      priority: "HIGH",
    })
      .then((newNote) => {
        console.log("Added notification:", newNote);
        setNotifications((prev) => [...prev, newNote]);
        setNewMessage("");
      })
      .catch((err) => console.error("Error adding notification:", err));
  };

  const handleClassify = (notification) => {
    classifyNotification(notification)
      .then((result) => {
        console.log("Classify result:", result);
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, decision: result } : n
          )
        );
      })
      .catch((err) => console.error("Error classifying notification:", err));
  };

  const handleAudit = (eventId) => {
    getAudit(eventId)
      .then((log) => {
        console.log("Fetched audit log:", log);
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === eventId ? { ...n, audit: log } : n
          )
        );
      })
      .catch((err) => console.error("Error fetching audit log:", err));
  };

  return (
    <div className="App">
      <h1>Notifications</h1>

      <input
        type="text"
        placeholder="Enter a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleAdd}>Add Notification</button>

      <ul>
        {notifications.map((n) => (
          <li key={n.id}>
            {n.message} ({n.priority})
            <button onClick={() => handleClassify(n)}>Classify</button>
            <button onClick={() => handleAudit(n.id)}>View Audit</button>

            {n.decision && (
              <p>
                <strong>Decision:</strong> {n.decision}
              </p>
            )}

            {n.audit && (
              <div className="audit-log">
                <h4>Audit Log</h4>
                <p>Decision: {n.audit.decision}</p>
                <p>Explanation: {n.audit.explanation}</p>
                <p>Timestamp: {n.audit.timestamp}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;