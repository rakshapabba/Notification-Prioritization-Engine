package com.example.notificationengine;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;
    private String decision;
    private String explanation;
    private LocalDateTime timestamp;

    public AuditLog() {}

    // Used by NotificationController
    public AuditLog(String decision, String explanation, LocalDateTime timestamp) {
        this.decision = decision;
        this.explanation = explanation;
        this.timestamp = timestamp;
    }

    // Used by NotificationDecisionService
    public AuditLog(Long eventId, String decision, String explanation, LocalDateTime timestamp) {
        this.eventId = eventId;
        this.decision = decision;
        this.explanation = explanation;
        this.timestamp = timestamp;
    }

    public Long getId() { return id; }
    public Long getEventId() { return eventId; }
    public String getDecision() { return decision; }
    public String getExplanation() { return explanation; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public void setEventId(Long eventId) { this.eventId = eventId; }
    public void setDecision(String decision) { this.decision = decision; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}