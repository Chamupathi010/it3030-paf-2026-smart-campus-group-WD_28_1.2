package com.facility.booking.dto.response;

import com.facility.booking.model.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    private String id;
    private String userId;
    private String title;
    private String message;
    private Notification.NotificationType type;
    private String referenceId;
    private boolean read;
    private LocalDateTime createdAt;
}
