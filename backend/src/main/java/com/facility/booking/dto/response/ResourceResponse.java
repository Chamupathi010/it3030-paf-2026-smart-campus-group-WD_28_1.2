package com.facility.booking.dto.response;

import com.facility.booking.model.Resource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResourceResponse {
    private String id;
    private String name;
    private Resource.ResourceType type;
    private int capacity;
    private Object location;
    private Resource.ResourceStatus status;
    private boolean deleted;
    private List<Object> availabilityWindows;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
