package com.example.notificationengine.controller;

import com.example.notificationengine.Notification;
import com.example.notificationengine.NotificationRepository;
import com.example.notificationengine.AuditLog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class NotificationController {

    @Autowired
    private NotificationRepository repo;

    // Add a new notification
    @PostMapping
    public ResponseEntity<Notification> create(@RequestBody Notification notification) {
        Notification saved = repo.save(notification);
        return ResponseEntity.ok(saved);
    }

    // Fetch all notifications
    @GetMapping
    public List<Notification> getAll() {
        return repo.findAll();
    }

    // Classify a notification
    @PostMapping("/classify")
    public ResponseEntity<String> classify(@RequestBody Notification notification) {
        String decision;
        if ("HIGH".equalsIgnoreCase(notification.getPriority())) {
            decision = "NOW";
        } else if ("MEDIUM".equalsIgnoreCase(notification.getPriority())) {
            decision = "LATER";
        } else {
            decision = "NEVER";
        }
        return ResponseEntity.ok(decision);
    }

    // Get audit log for a notification
    @GetMapping("/audit/{id}")
    public ResponseEntity<AuditLog> getAudit(@PathVariable Long id) {
        AuditLog log = new AuditLog(
            "NOW",
            "Rule matched: HIGH priority",
            LocalDateTime.now()
        );
        return ResponseEntity.ok(log);
    }
}