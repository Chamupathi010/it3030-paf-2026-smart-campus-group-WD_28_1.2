package com.facility.booking.dto.request;

import com.facility.booking.model.Location;
import com.facility.booking.model.Resource;
import com.facility.booking.model.AvailabilityWindow;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ResourceRequest {

    @NotBlank(message = "Resource name is required")
    private String name;

    @NotNull(message = "Resource type is required")
    private Resource.ResourceType type;

    @Min(value = 1, message = "Capacity must be at least 1")
    private int capacity;

    @NotNull(message = "Location is required")
    private Location location;

    private String description;

    private Resource.ResourceStatus status;

    private List<AvailabilityWindow> availabilityWindows;
}
