package com.stocksense.repository;

import com.stocksense.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByWarehouseId(Long warehouseId);
    
    @Query("SELECT l FROM Location l WHERE l.warehouse.id = :warehouseId AND l.status = true")
    List<Location> findActiveByWarehouseId(@Param("warehouseId") Long warehouseId);
}
