package com.facility.booking.repository;

import com.facility.booking.model.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends MongoRepository<Resource, String> {

    boolean existsByNameAndDeletedFalse(String name);

    Page<Resource> findByDeletedFalse(Pageable pageable);

    @Query("{ 'deleted': false, 'type': ?0 }")
    Page<Resource> findByTypeAndDeletedFalse(Resource.ResourceType type, Pageable pageable);

    @Query("{ 'deleted': false, 'capacity': { $gte: ?0 } }")
    Page<Resource> findByCapacityGreaterThanEqualAndDeletedFalse(int capacity, Pageable pageable);

    @Query("{ 'deleted': false, 'location.building': ?0 }")
    Page<Resource> findByLocationBuildingAndDeletedFalse(String building, Pageable pageable);

    @Query("{ 'deleted': false, $and: [ { 'type': ?0 }, { 'capacity': { $gte: ?1 } } ] }")
    Page<Resource> findByTypeAndCapacityGreaterThanEqualAndDeletedFalse(Resource.ResourceType type, int capacity, Pageable pageable);
}
