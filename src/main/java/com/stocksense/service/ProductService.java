package com.stocksense.service;

import com.stocksense.entity.Product;
import com.stocksense.repository.CategoryRepository;
import com.stocksense.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> searchProductsByName(String keyword) {
        return productRepository.searchByName(keyword);
    }

    public List<Product> searchProductsBySku(String keyword) {
        return productRepository.searchBySku(keyword);
    }

    public List<Product> getOutOfStockProducts() {
        return productRepository.findOutOfStock();
    }

    public List<Product> getLowStockProducts() {
        return productRepository.findLowStock();
    }

    public List<Product> getInStockProducts() {
        return productRepository.findInStock();
    }

    public Product createProduct(Product product) {
        if (productRepository.existsBySku(product.getSku())) {
            throw new RuntimeException("Product with SKU '" + product.getSku() + "' already exists");
        }
        
        if (product.getCategory() == null || product.getCategory().getId() == null) {
            throw new RuntimeException("Category is required");
        }
        
        categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + product.getCategory().getId()));
        
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        
        if (!product.getSku().equals(productDetails.getSku()) && 
            productRepository.existsBySku(productDetails.getSku())) {
            throw new RuntimeException("Product with SKU '" + productDetails.getSku() + "' already exists");
        }
        
        if (productDetails.getCategory() != null && productDetails.getCategory().getId() != null) {
            categoryRepository.findById(productDetails.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDetails.getCategory().getId()));
            product.setCategory(productDetails.getCategory());
        }
        
        product.setName(productDetails.getName());
        product.setSku(productDetails.getSku());
        product.setUnitOfMeasure(productDetails.getUnitOfMeasure());
        product.setReorderLevel(productDetails.getReorderLevel());
        product.setCurrentStock(productDetails.getCurrentStock());
        
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
