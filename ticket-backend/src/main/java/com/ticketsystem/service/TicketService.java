package com.ticketsystem.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketsystem.dto.AddCommentRequest;
import com.ticketsystem.dto.AssignTechnicianRequest;
import com.ticketsystem.dto.CreateTicketRequest;
import com.ticketsystem.dto.UpdateStatusRequest;
import com.ticketsystem.model.Comment;
import com.ticketsystem.model.Ticket;
import com.ticketsystem.model.TicketStatus;
import com.ticketsystem.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketService {

    private final TicketRepository ticketRepository;

    @Value("${app.upload.dir:./uploads/}")
    private String uploadDir;

    private static final List<String> ALLOWED_TYPES = Arrays.asList(
            "image/jpeg", "image/jpg", "image/png"
    );

    private static final Map<TicketStatus, TicketStatus> VALID_TRANSITIONS = new HashMap<>();

    static {
        VALID_TRANSITIONS.put(TicketStatus.OPEN, TicketStatus.IN_PROGRESS);
        VALID_TRANSITIONS.put(TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED);
        VALID_TRANSITIONS.put(TicketStatus.RESOLVED, TicketStatus.CLOSED);
    }

    public Ticket createTicket(String ticketJson, List<MultipartFile> images) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        CreateTicketRequest request = objectMapper.readValue(ticketJson, CreateTicketRequest.class);

        // Validate image count
        if (images != null && images.size() > 3) {
            throw new IllegalArgumentException("Maximum 3 images are allowed per ticket.");
        }

        // Save images
        List<String> imagePaths = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                if (image.isEmpty()) continue;
                validateImageType(image);
                String savedPath = saveImage(image);
                imagePaths.add(savedPath);
            }
        }

        Ticket ticket = Ticket.builder()
                .resourceId(request.getResourceId())
                .category(request.getCategory())
                .description(request.getDescription())
                .priority(request.getPriority())
                .createdBy(request.getCreatedBy())
                .status(TicketStatus.OPEN)
                .imagePaths(imagePaths)
                .comments(new ArrayList<>())
                .build();

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getMyTickets(String userId) {
        return ticketRepository.findByCreatedBy(userId);
    }

    public Ticket assignTechnician(String id, AssignTechnicianRequest request) {
        Ticket ticket = findTicketById(id);
        ticket.setAssignedTechnician(request.getAssignedTechnician());
        return ticketRepository.save(ticket);
    }

    public Ticket updateStatus(String id, UpdateStatusRequest request) {
        Ticket ticket = findTicketById(id);
        TicketStatus currentStatus = ticket.getStatus();
        TicketStatus newStatus = request.getStatus();

        // Allow admin to set REJECTED from any current state with a reason
        if (newStatus == TicketStatus.REJECTED) {
            ticket.setStatus(TicketStatus.REJECTED);
            ticket.setRejectionReason(request.getReason());
            return ticketRepository.save(ticket);
        }

        // Normal forward-only transitions: OPEN -> IN_PROGRESS -> RESOLVED -> CLOSED
        TicketStatus expectedNext = VALID_TRANSITIONS.get(currentStatus);
        if (expectedNext == null || !expectedNext.equals(newStatus)) {
            throw new IllegalArgumentException(
                    "Invalid status transition from " + currentStatus + " to " + newStatus +
                    ". Expected: " + (expectedNext != null ? expectedNext : "No further transitions allowed.")
            );
        }

        // clear any previous rejection reason when moving forward
        ticket.setRejectionReason(null);
        ticket.setStatus(newStatus);
        return ticketRepository.save(ticket);
    }

    public Ticket addComment(String id, AddCommentRequest request) {
        Ticket ticket = findTicketById(id);
        Comment comment = Comment.builder()
                .author(request.getAuthor())
                .message(request.getMessage())
                .createdAt(new Date())
                .build();
        ticket.getComments().add(comment);
        return ticketRepository.save(ticket);
    }

    // -------  Helpers  -------

    private Ticket findTicketById(String id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found with id: " + id));
    }

    public Ticket getTicketById(String id) {
        return findTicketById(id);
    }

    private void validateImageType(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException(
                    "Invalid file type: " + contentType + ". Only jpg, jpeg, and png are allowed."
            );
        }
    }

    private String saveImage(MultipartFile file) throws IOException {
        // Ensure upload directory exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID() + extension;
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath);

        log.info("Saved image: {}", filePath);
        return uniqueFilename;
    }
}
