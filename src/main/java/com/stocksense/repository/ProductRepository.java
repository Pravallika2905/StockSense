package com.stocksense.repository;

import com.stocksense.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    
    List<Product> findByCategoryId(Long categoryId);
    
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchByName(@Param("keyword") String keyword);
    
    @Query("SELECT p FROM Product p WHERE LOWER(p.sku) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchBySku(@Param("keyword") String keyword);
    
    @Query("SELECT p FROM Product p WHERE p.currentStock = 0")
    List<Product> findOutOfStock();
    
    @Query("SELECT p FROM Product p WHERE p.currentStock > 0 AND p.currentStock <= p.reorderLevel")
    List<Product> findLowStock();
    
    @Query("SELECT p FROM Product p WHERE p.currentStock > p.reorderLevel")
    List<Product> findInStock();
}
