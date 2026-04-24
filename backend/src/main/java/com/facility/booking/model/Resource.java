package com.facility.booking.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "resources")
public class Resource {

    @Id
    private String id;

    private String name;

    private ResourceType type;

    private int capacity;

    private Location location;

    @Builder.Default
    private ResourceStatus status = ResourceStatus.ACTIVE;

    @Builder.Default
    private boolean deleted = false;

    @Builder.Default
    private List<AvailabilityWindow> availabilityWindows = new ArrayList<>();

    private String description;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public enum ResourceType {
        CONFERENCE_ROOM, LAB, SPORTS_FACILITY, AUDITORIUM, CLASSROOM, PARKING, GYM, CAFETERIA
    }

    public enum ResourceStatus {
        ACTIVE, OUT_OF_SERVICE
    }
}
