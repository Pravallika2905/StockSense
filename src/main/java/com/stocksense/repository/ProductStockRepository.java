package com.stocksense.repository;

import com.stocksense.entity.ProductStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductStockRepository extends JpaRepository<ProductStock, Long> {
    
    Optional<ProductStock> findByProductIdAndWarehouseIdAndLocationId(
        Long productId, Long warehouseId, Long locationId);
    
    List<ProductStock> findByProductId(Long productId);
    
    List<ProductStock> findByWarehouseId(Long warehouseId);
    
    List<ProductStock> findByLocationId(Long locationId);
    
    @Query("SELECT ps FROM ProductStock ps WHERE ps.product.id = :productId AND ps.warehouse.id = :warehouseId")
    List<ProductStock> findByProductAndWarehouse(@Param("productId") Long productId, @Param("warehouseId") Long warehouseId);
}
