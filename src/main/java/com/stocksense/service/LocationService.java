package com.stocksense.service;

import com.stocksense.entity.Location;
import com.stocksense.repository.LocationRepository;
import com.stocksense.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public List<Location> getLocationsByWarehouse(Long warehouseId) {
        return locationRepository.findByWarehouseId(warehouseId);
    }

    public Location getLocationById(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + id));
    }

    public Location createLocation(Location location) {
        if (location.getWarehouse() == null || location.getWarehouse().getId() == null) {
            throw new RuntimeException("Warehouse is required");
        }
        
        warehouseRepository.findById(location.getWarehouse().getId())
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + location.getWarehouse().getId()));
        
        return locationRepository.save(location);
    }

    public Location updateLocation(Long id, Location locationDetails) {
        Location location = getLocationById(id);
        
        if (locationDetails.getWarehouse() != null && locationDetails.getWarehouse().getId() != null) {
            warehouseRepository.findById(locationDetails.getWarehouse().getId())
                    .orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + locationDetails.getWarehouse().getId()));
            location.setWarehouse(locationDetails.getWarehouse());
        }
        
        location.setCode(locationDetails.getCode());
        location.setName(locationDetails.getName());
        location.setDescription(locationDetails.getDescription());
        location.setStatus(locationDetails.getStatus());
        
        return locationRepository.save(location);
    }

    public void deleteLocation(Long id) {
        Location location = getLocationById(id);
        if (!location.getProductStocks().isEmpty()) {
            throw new RuntimeException("Cannot delete location with existing stock");
        }
        locationRepository.delete(location);
    }
}
