const API_URL = "http://localhost:8080/api/notifications";

// Fetch all notifications
export async function getNotifications() {
  console.log("Fetching notifications from backend...");
  const response = await fetch(API_URL);
  console.log("Response status (GET):", response.status);
  if (!response.ok) throw new Error("Failed to fetch notifications");
  return response.json();
}

// Add a new notification
export async function addNotification(notification) {
  console.log("Sending notification to backend:", notification);
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  });
  console.log("Response status (POST):", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend error:", errorText);
    throw new Error("Failed to add notification");
  }
  return response.json();
}

// Classify a notification
export async function classifyNotification(notification) {
  console.log("Classifying notification:", notification);
  const response = await fetch(`${API_URL}/classify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  });
  console.log("Response status (classify):", response.status);
  if (!response.ok) throw new Error("Failed to classify notification");
  return response.text(); // ✅ backend returns plain text (NOW/LATER/NEVER)
}

// Get audit log for a notification
export async function getAudit(eventId) {
  console.log("Fetching audit log for event:", eventId);
  const response = await fetch(`${API_URL}/audit/${eventId}`);
  console.log("Response status (audit):", response.status);
  if (!response.ok) throw new Error("Failed to fetch audit log");
  return response.json(); // ✅ backend returns AuditLog object
}