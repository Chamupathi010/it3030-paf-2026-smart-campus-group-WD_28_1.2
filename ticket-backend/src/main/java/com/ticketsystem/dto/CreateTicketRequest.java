package com.ticketsystem.dto;

import com.ticketsystem.model.Priority;
import lombok.Data;

@Data
public class CreateTicketRequest {
    private String resourceId;
    private String category;
    private String description;
    private Priority priority;
    private String createdBy;
}
