package com.example.notificationengine.service;

import com.example.notificationengine.Notification;
import com.example.notificationengine.AuditLog;
import com.example.notificationengine.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationDecisionService {

    private final AuditLogRepository auditRepo;

    public NotificationDecisionService(AuditLogRepository auditRepo) {
        this.auditRepo = auditRepo;
    }

    public String classify(Notification notification) {
        String decision;
        String explanation;

        // 1. Suppress duplicates
        boolean isDuplicate = auditRepo.findByEventId(notification.getId()).isPresent();
        if (isDuplicate) {
            decision = "NEVER";
            explanation = "Duplicate notification suppressed";
        }
        // 2. Quiet hours (10 PM – 7 AM)
        else if (isQuietHours()) {
            decision = "LATER";
            explanation = "Notification deferred due to quiet hours";
        }
        // 3. Priority handling
        else if ("HIGH".equalsIgnoreCase(notification.getPriority())) {
            decision = "NOW";
            explanation = "High priority notification delivered immediately";
        } else {
            decision = "LATER";
            explanation = "Normal priority notification deferred";
        }

        // Save audit log
        AuditLog log = new AuditLog(notification.getId(), decision, explanation, LocalDateTime.now());
        auditRepo.save(log);

        return decision;
    }

    private boolean isQuietHours() {
        int hour = java.time.LocalTime.now().getHour();
        return (hour >= 22 || hour < 7); // 10 PM – 7 AM
    }
}