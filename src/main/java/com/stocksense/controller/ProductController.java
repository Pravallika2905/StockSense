package com.stocksense.controller;

import com.stocksense.entity.Product;
import com.stocksense.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<Product>> searchByName(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProductsByName(keyword));
    }

    @GetMapping("/search/sku")
    public ResponseEntity<List<Product>> searchBySku(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProductsBySku(keyword));
    }

    @GetMapping("/status/out-of-stock")
    public ResponseEntity<List<Product>> getOutOfStock() {
        return ResponseEntity.ok(productService.getOutOfStockProducts());
    }

    @GetMapping("/status/low-stock")
    public ResponseEntity<List<Product>> getLowStock() {
        return ResponseEntity.ok(productService.getLowStockProducts());
    }

    @GetMapping("/status/in-stock")
    public ResponseEntity<List<Product>> getInStock() {
        return ResponseEntity.ok(productService.getInStockProducts());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
