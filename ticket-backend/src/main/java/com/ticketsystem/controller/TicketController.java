package com.ticketsystem.controller;

import com.ticketsystem.dto.AddCommentRequest;
import com.ticketsystem.dto.AssignTechnicianRequest;
import com.ticketsystem.dto.UpdateStatusRequest;
import com.ticketsystem.model.Ticket;
import com.ticketsystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    // POST /tickets — Create ticket with optional images (multipart)
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Ticket> createTicket(
            @RequestPart("ticket") String ticketJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws IOException {
        Ticket ticket = ticketService.createTicket(ticketJson, images);
        return ResponseEntity.ok(ticket);
    }

    // GET /tickets — Get all tickets
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    // GET /tickets/{id} — Get ticket by id
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable String id) {
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    // GET /tickets/my?userId=... — Get tickets by user
    @GetMapping("/my")
    public ResponseEntity<List<Ticket>> getMyTickets(@RequestParam String userId) {
        return ResponseEntity.ok(ticketService.getMyTickets(userId));
    }

    // PUT /tickets/{id}/assign — Assign technician
    @PutMapping("/{id}/assign")
    public ResponseEntity<Ticket> assignTechnician(
            @PathVariable String id,
            @RequestBody AssignTechnicianRequest request
    ) {
        return ResponseEntity.ok(ticketService.assignTechnician(id, request));
    }

    // PUT /tickets/{id}/status — Update ticket status
    @PutMapping("/{id}/status")
    public ResponseEntity<Ticket> updateStatus(
            @PathVariable String id,
            @RequestBody UpdateStatusRequest request
    ) {
        return ResponseEntity.ok(ticketService.updateStatus(id, request));
    }

    // POST /tickets/{id}/comment — Add a comment
    @PostMapping("/{id}/comment")
    public ResponseEntity<Ticket> addComment(
            @PathVariable String id,
            @RequestBody AddCommentRequest request
    ) {
        return ResponseEntity.ok(ticketService.addComment(id, request));
    }
}
