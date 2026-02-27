const API_URL = "http://localhost:8080/api/notifications";

// Fetch all notifications
export async function getNotifications() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }
  return response.json();
}

// Add a new notification
export async function addNotification(notification) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  });
  if (!response.ok) {
    throw new Error("Failed to add notification");
  }
  return response.json();
}

// Classify a notification
export async function classifyNotification(notification) {
  const response = await fetch(`${API_URL}/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  });
  if (!response.ok) {
    throw new Error("Failed to classify notification");
  }
  return response.text(); // backend returns "Decision: NOW/LATER/NEVER"
}

// Get audit log for a notification
export async function getAudit(eventId) {
  const response = await fetch(`${API_URL}/audit/${eventId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch audit log");
  }
  return response.json(); // backend returns AuditLog object
}