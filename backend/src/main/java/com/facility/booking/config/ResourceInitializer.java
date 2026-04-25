package com.facility.booking.config;

import com.facility.booking.model.Location;
import com.facility.booking.model.Resource;
import com.facility.booking.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResourceInitializer implements CommandLineRunner {

    private final ResourceRepository resourceRepository;

    @Override
    public void run(String... args) {
        createIfMissing(
                "Classroom 1",
                Resource.ResourceType.CLASSROOM,
                40,
                Location.builder().building("Main Building").floor("1").room("C-101").build(),
                "Standard classroom with projector and whiteboard"
        );

        createIfMissing(
                "Auditorium 1",
                Resource.ResourceType.AUDITORIUM,
                200,
                Location.builder().building("Main Building").floor("Ground").room("A-001").build(),
                "Large auditorium suitable for events and presentations"
        );
    }

    private void createIfMissing(String name,
                                 Resource.ResourceType type,
                                 int capacity,
                                 Location location,
                                 String description) {
        if (resourceRepository.existsByNameAndDeletedFalse(name)) {
            return;
        }

        Resource resource = Resource.builder()
                .name(name)
                .type(type)
                .capacity(capacity)
                .location(location)
                .description(description)
                .status(Resource.ResourceStatus.ACTIVE)
                .build();

        resourceRepository.save(resource);
        log.info("Default resource created: {}", name);
    }
}
