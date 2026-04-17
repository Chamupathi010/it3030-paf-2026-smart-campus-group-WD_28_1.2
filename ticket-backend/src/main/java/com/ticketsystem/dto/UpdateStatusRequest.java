package com.ticketsystem.dto;

import com.ticketsystem.model.TicketStatus;
import lombok.Data;

@Data
public class UpdateStatusRequest {
    private TicketStatus status;
    private String reason; // optional rejection reason (used when setting REJECTED)
}
