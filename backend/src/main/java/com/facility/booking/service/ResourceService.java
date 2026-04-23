package com.facility.booking.service;

import com.facility.booking.dto.request.ResourceRequest;
import com.facility.booking.exception.ResourceNotFoundException;
import com.facility.booking.model.Resource;
import com.facility.booking.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public Resource createResource(ResourceRequest request) {
        Resource resource = Resource.builder()
                .name(request.getName())
                .type(request.getType())
                .capacity(request.getCapacity())
                .location(request.getLocation())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : Resource.ResourceStatus.ACTIVE)
                .availabilityWindows(request.getAvailabilityWindows() != null ? request.getAvailabilityWindows() : java.util.Collections.emptyList())
                .build();
        return resourceRepository.save(resource);
    }

    public Page<Resource> getResources(Resource.ResourceType type, Integer minCapacity,
                                        String building, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        if (type != null && minCapacity != null) {
            return resourceRepository.findByTypeAndCapacityGreaterThanEqualAndDeletedFalse(type, minCapacity, pageable);
        } else if (type != null) {
            return resourceRepository.findByTypeAndDeletedFalse(type, pageable);
        } else if (minCapacity != null) {
            return resourceRepository.findByCapacityGreaterThanEqualAndDeletedFalse(minCapacity, pageable);
        } else if (building != null) {
            return resourceRepository.findByLocationBuildingAndDeletedFalse(building, pageable);
        }
        return resourceRepository.findByDeletedFalse(pageable);
    }

    public Resource getResourceById(String id) {
        return resourceRepository.findById(id)
                .filter(r -> !r.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Resource", id));
    }

    public Resource updateResource(String id, ResourceRequest request) {
        Resource resource = getResourceById(id);
        resource.setName(request.getName());
        resource.setType(request.getType());
        resource.setCapacity(request.getCapacity());
        resource.setLocation(request.getLocation());
        resource.setDescription(request.getDescription());
        if (request.getStatus() != null) resource.setStatus(request.getStatus());
        if (request.getAvailabilityWindows() != null) resource.setAvailabilityWindows(request.getAvailabilityWindows());
        return resourceRepository.save(resource);
    }

    public Resource updateResourceStatus(String id, Resource.ResourceStatus status) {
        Resource resource = getResourceById(id);
        resource.setStatus(status);
        return resourceRepository.save(resource);
    }

    public void deleteResource(String id) {
        Resource resource = getResourceById(id);
        resource.setDeleted(true);
        resourceRepository.save(resource);
    }
}
