package com.stocksense.service;

import com.stocksense.entity.ProductStock;
import com.stocksense.repository.ProductRepository;
import com.stocksense.repository.ProductStockRepository;
import com.stocksense.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductStockService {

    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<ProductStock> getAllProductStocks() {
        return productStockRepository.findAll();
    }

    public ProductStock getProductStockById(Long id) {
        return productStockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ProductStock not found with id: " + id));
    }

    public List<ProductStock> getStocksByProduct(Long productId) {
        return productStockRepository.findByProductId(productId);
    }

    public List<ProductStock> getStocksByWarehouse(Long warehouseId) {
        return productStockRepository.findByWarehouseId(warehouseId);
    }

    public List<ProductStock> getStocksByLocation(Long locationId) {
        return productStockRepository.findByLocationId(locationId);
    }

    public List<ProductStock> getStocksByProductAndWarehouse(Long productId, Long warehouseId) {
        return productStockRepository.findByProductAndWarehouse(productId, warehouseId);
    }

    public ProductStock createProductStock(ProductStock productStock) {
        validateProductStock(productStock);
        
        Optional<ProductStock> existing = productStockRepository.findByProductIdAndWarehouseIdAndLocationId(
            productStock.getProduct().getId(),
            productStock.getWarehouse().getId(),
            productStock.getLocation() != null ? productStock.getLocation().getId() : null
        );
        
        if (existing.isPresent()) {
            throw new RuntimeException("Stock record already exists for this product/warehouse/location combination");
        }
        
        return productStockRepository.save(productStock);
    }

    @Transactional
    public ProductStock updateStockQuantity(Long id, Integer newQuantity) {
        ProductStock productStock = getProductStockById(id);
        productStock.setQuantity(newQuantity);
        return productStockRepository.save(productStock);
    }

    public void deleteProductStock(Long id) {
        ProductStock productStock = getProductStockById(id);
        productStockRepository.delete(productStock);
    }

    private void validateProductStock(ProductStock productStock) {
        if (productStock.getProduct() == null || productStock.getProduct().getId() == null) {
            throw new RuntimeException("Product is required");
        }
        
        if (productStock.getWarehouse() == null || productStock.getWarehouse().getId() == null) {
            throw new RuntimeException("Warehouse is required");
        }
        
        productRepository.findById(productStock.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productStock.getProduct().getId()));
        
        warehouseRepository.findById(productStock.getWarehouse().getId())
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + productStock.getWarehouse().getId()));
        
        if (productStock.getLocation() != null && productStock.getLocation().getId() != null) {
            warehouseRepository.findById(productStock.getLocation().getId())
                    .orElseThrow(() -> new RuntimeException("Location not found with id: " + productStock.getLocation().getId()));
        }
    }
}
