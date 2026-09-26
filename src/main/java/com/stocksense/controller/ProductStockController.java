package com.stocksense.controller;

import com.stocksense.entity.ProductStock;
import com.stocksense.service.ProductStockService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-stocks")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductStockController {

    @Autowired
    private ProductStockService productStockService;

    @GetMapping
    public ResponseEntity<List<ProductStock>> getAllProductStocks() {
        return ResponseEntity.ok(productStockService.getAllProductStocks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductStock> getProductStockById(@PathVariable Long id) {
        return ResponseEntity.ok(productStockService.getProductStockById(id));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductStock>> getStocksByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(productStockService.getStocksByProduct(productId));
    }

    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<ProductStock>> getStocksByWarehouse(@PathVariable Long warehouseId) {
        return ResponseEntity.ok(productStockService.getStocksByWarehouse(warehouseId));
    }

    @GetMapping("/location/{locationId}")
    public ResponseEntity<List<ProductStock>> getStocksByLocation(@PathVariable Long locationId) {
        return ResponseEntity.ok(productStockService.getStocksByLocation(locationId));
    }

    @GetMapping("/product/{productId}/warehouse/{warehouseId}")
    public ResponseEntity<List<ProductStock>> getStocksByProductAndWarehouse(
            @PathVariable Long productId, 
            @PathVariable Long warehouseId) {
        return ResponseEntity.ok(productStockService.getStocksByProductAndWarehouse(productId, warehouseId));
    }

    @PostMapping
    public ResponseEntity<ProductStock> createProductStock(@Valid @RequestBody ProductStock productStock) {
        ProductStock createdStock = productStockService.createProductStock(productStock);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStock);
    }

    @PutMapping("/{id}/quantity")
    public ResponseEntity<ProductStock> updateStockQuantity(
            @PathVariable Long id, 
            @RequestParam Integer quantity) {
        ProductStock updatedStock = productStockService.updateStockQuantity(id, quantity);
        return ResponseEntity.ok(updatedStock);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductStock(@PathVariable Long id) {
        productStockService.deleteProductStock(id);
        return ResponseEntity.noContent().build();
    }
}
