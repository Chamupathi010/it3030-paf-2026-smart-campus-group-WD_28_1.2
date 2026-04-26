package com.facility.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class FacilityBookingApplication {
    public static void main(String[] args) {
        SpringApplication.run(FacilityBookingApplication.class, args);
    }
}
