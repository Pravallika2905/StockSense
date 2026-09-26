package com.stocksense.config;

import com.stocksense.entity.*;
import com.stocksense.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final WarehouseRepository warehouseRepository;
    private final LocationRepository locationRepository;
    private final ProductRepository productRepository;
    private final ProductStockRepository productStockRepository;

    public DataInitializer(CategoryRepository categoryRepository,
                          WarehouseRepository warehouseRepository,
                          LocationRepository locationRepository,
                          ProductRepository productRepository,
                          ProductStockRepository productStockRepository) {
        this.categoryRepository = categoryRepository;
        this.warehouseRepository = warehouseRepository;
        this.locationRepository = locationRepository;
        this.productRepository = productRepository;
        this.productStockRepository = productStockRepository;
    }

    @Override
    public void run(String... args) {
        // Create Categories
        Category electronics = new Category();
        electronics.setName("Electronics");
        electronics.setDescription("Electronic devices and components");
        categoryRepository.save(electronics);

        Category hardware = new Category();
        hardware.setName("Hardware");
        hardware.setDescription("Industrial hardware and tools");
        categoryRepository.save(hardware);

        Category rawMaterials = new Category();
        rawMaterials.setName("Raw Materials");
        rawMaterials.setDescription("Raw materials for manufacturing");
        categoryRepository.save(rawMaterials);

        // Create Warehouses
        Warehouse warehouse1 = new Warehouse();
        warehouse1.setName("Main Warehouse");
        warehouse1.setCode("WH001");
        warehouse1.setAddress("123 Industrial Ave, City");
        warehouse1.setDescription("Primary storage facility");
        warehouse1.setStatus(true);
        warehouseRepository.save(warehouse1);

        Warehouse warehouse2 = new Warehouse();
        warehouse2.setName("Secondary Warehouse");
        warehouse2.setCode("WH002");
        warehouse2.setAddress("456 Storage Rd, City");
        warehouse2.setDescription("Secondary storage facility");
        warehouse2.setStatus(true);
        warehouseRepository.save(warehouse2);

        // Create Locations
        Location loc1 = new Location();
        loc1.setWarehouse(warehouse1);
        loc1.setCode("A1");
        loc1.setName("Rack A1");
        loc1.setDescription("Ground floor rack");
        loc1.setStatus(true);
        locationRepository.save(loc1);

        Location loc2 = new Location();
        loc2.setWarehouse(warehouse1);
        loc2.setCode("A2");
        loc2.setName("Rack A2");
        loc2.setDescription("Ground floor rack");
        loc2.setStatus(true);
        locationRepository.save(loc2);

        Location loc3 = new Location();
        loc3.setWarehouse(warehouse2);
        loc3.setCode("B1");
        loc3.setName("Rack B1");
        loc3.setDescription("First floor rack");
        loc3.setStatus(true);
        locationRepository.save(loc3);

        // Create Products
        Product product1 = new Product();
        product1.setName("Steel Rod");
        product1.setSku("SR001");
        product1.setCategory(hardware);
        product1.setUnitOfMeasure("pcs");
        product1.setReorderLevel(30);
        product1.setCurrentStock(20);
        productRepository.save(product1);

        Product product2 = new Product();
        product2.setName("Copper Wire");
        product2.setSku("CW001");
        product2.setCategory(rawMaterials);
        product2.setUnitOfMeasure("meters");
        product2.setReorderLevel(100);
        product2.setCurrentStock(50);
        productRepository.save(product2);

        Product product3 = new Product();
        product3.setName("LED Display");
        product3.setSku("LD001");
        product3.setCategory(electronics);
        product3.setUnitOfMeasure("pcs");
        product3.setReorderLevel(10);
        product3.setCurrentStock(0);
        productRepository.save(product3);

        Product product4 = new Product();
        product4.setName("Microcontroller");
        product4.setSku("MC001");
        product4.setCategory(electronics);
        product4.setUnitOfMeasure("pcs");
        product4.setReorderLevel(50);
        product4.setCurrentStock(100);
        productRepository.save(product4);

        // Create ProductStock entries
        ProductStock stock1 = new ProductStock();
        stock1.setProduct(product1);
        stock1.setWarehouse(warehouse1);
        stock1.setLocation(loc1);
        stock1.setQuantity(15);
        productStockRepository.save(stock1);

        ProductStock stock2 = new ProductStock();
        stock2.setProduct(product1);
        stock2.setWarehouse(warehouse1);
        stock2.setLocation(loc2);
        stock2.setQuantity(5);
        productStockRepository.save(stock2);

        ProductStock stock3 = new ProductStock();
        stock3.setProduct(product2);
        stock3.setWarehouse(warehouse1);
        stock3.setLocation(loc1);
        stock3.setQuantity(50);
        productStockRepository.save(stock3);

        ProductStock stock4 = new ProductStock();
        stock4.setProduct(product4);
        stock4.setWarehouse(warehouse2);
        stock4.setLocation(loc3);
        stock4.setQuantity(100);
        productStockRepository.save(stock4);

        System.out.println("Seed data initialized successfully!");
    }
}
