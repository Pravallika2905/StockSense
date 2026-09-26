package com.stocksense.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "SKU is required")
    @Column(nullable = false, unique = true)
    private String sku;

    @NotNull(message = "Category is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @NotBlank(message = "Unit of measure is required")
    @Column(nullable = false)
    private String unitOfMeasure;

    @Min(value = 0, message = "Reorder level must be >= 0")
    @Column(nullable = false)
    private Integer reorderLevel = 0;

    @Min(value = 0, message = "Current stock must be >= 0")
    @Column(nullable = false)
    private Integer currentStock = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductStock> productStocks = new ArrayList<>();

    public String getStockStatus() {
        if (currentStock == 0) {
            return "OUT_OF_STOCK";
        } else if (currentStock <= reorderLevel) {
            return "LOW_STOCK";
        } else {
            return "IN_STOCK";
        }
    }
}
