package com.stocksense.service;

import com.stocksense.entity.Warehouse;
import com.stocksense.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Warehouse getWarehouseById(Long id) {
        return warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + id));
    }

    public Warehouse createWarehouse(Warehouse warehouse) {
        if (warehouseRepository.existsByCode(warehouse.getCode())) {
            throw new RuntimeException("Warehouse with code '" + warehouse.getCode() + "' already exists");
        }
        return warehouseRepository.save(warehouse);
    }

    public Warehouse updateWarehouse(Long id, Warehouse warehouseDetails) {
        Warehouse warehouse = getWarehouseById(id);
        
        if (!warehouse.getCode().equals(warehouseDetails.getCode()) && 
            warehouseRepository.existsByCode(warehouseDetails.getCode())) {
            throw new RuntimeException("Warehouse with code '" + warehouseDetails.getCode() + "' already exists");
        }
        
        warehouse.setName(warehouseDetails.getName());
        warehouse.setCode(warehouseDetails.getCode());
        warehouse.setAddress(warehouseDetails.getAddress());
        warehouse.setDescription(warehouseDetails.getDescription());
        warehouse.setStatus(warehouseDetails.getStatus());
        
        return warehouseRepository.save(warehouse);
    }

    public void deleteWarehouse(Long id) {
        Warehouse warehouse = getWarehouseById(id);
        if (!warehouse.getLocations().isEmpty()) {
            throw new RuntimeException("Cannot delete warehouse with existing locations");
        }
        if (!warehouse.getProductStocks().isEmpty()) {
            throw new RuntimeException("Cannot delete warehouse with existing stock");
        }
        warehouseRepository.delete(warehouse);
    }
}
