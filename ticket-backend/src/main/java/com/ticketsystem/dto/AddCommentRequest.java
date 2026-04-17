package com.ticketsystem.dto;

import lombok.Data;

@Data
public class AddCommentRequest {
    private String author;
    private String message;
}
