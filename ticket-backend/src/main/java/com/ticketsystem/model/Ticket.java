package com.ticketsystem.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tickets")
public class Ticket {

    @Id
    private String id;

    private String resourceId;
    private String category;
    private String description;
    private Priority priority;

    @Builder.Default
    private TicketStatus status = TicketStatus.OPEN;

    private String assignedTechnician;
    private String createdBy;

    @Builder.Default
    private List<String> imagePaths = new ArrayList<>();

    @Builder.Default
    private List<Comment> comments = new ArrayList<>();

    private String rejectionReason;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;
}
