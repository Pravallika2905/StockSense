# StockSense – Smart Inventory & Stock Operations

## Team Architecture

- **Member 1**: Authentication + User/Profile
- **Member 2**: Product + Warehouse Management (THIS MODULE)
- **Member 3**: Inventory Operations (Receipts, Deliveries, Transfers, Adjustments)
- **Member 4**: Dashboard + Stock Ledger + History

## Member 2 Module Implementation

### Tech Stack

**Backend:**
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (in-memory for development)
- Java 17
- Maven

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide React (icons)

### Database Entities Created

1. **Category** - Product categories
   - Fields: id, name, description, createdAt, updatedAt
   - Relationship: One-to-Many with Product

2. **Product** - Product catalog
   - Fields: id, name, sku, category, unitOfMeasure, reorderLevel, currentStock, createdAt, updatedAt
   - Relationship: Many-to-One with Category, One-to-Many with ProductStock
   - Stock status logic: OUT_OF_STOCK, LOW_STOCK, IN_STOCK

3. **Warehouse** - Storage facilities
   - Fields: id, name, code, address, description, status, createdAt, updatedAt
   - Relationship: One-to-Many with Location and ProductStock

4. **Location** - Racks/shelves within warehouses
   - Fields: id, warehouse, code, name, description, status, createdAt, updatedAt
   - Relationship: Many-to-One with Warehouse, One-to-Many with ProductStock

5. **ProductStock** - Shared inventory tracking (for Member 3 & 4)
   - Fields: id, product, warehouse, location, quantity, createdAt, updatedAt
   - Unique constraint on (product, warehouse, location)
   - Relationships: Many-to-One with Product, Warehouse, Location

### API Endpoints

#### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

#### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{categoryId}` - Filter by category
- `GET /api/products/search/name?keyword=` - Search by name
- `GET /api/products/search/sku?keyword=` - Search by SKU
- `GET /api/products/status/out-of-stock` - Get out of stock products
- `GET /api/products/status/low-stock` - Get low stock products
- `GET /api/products/status/in-stock` - Get in stock products
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

#### Warehouses
- `GET /api/warehouses` - List all warehouses
- `GET /api/warehouses/{id}` - Get warehouse by ID
- `POST /api/warehouses` - Create warehouse
- `PUT /api/warehouses/{id}` - Update warehouse
- `DELETE /api/warehouses/{id}` - Delete warehouse

#### Locations
- `GET /api/locations` - List all locations
- `GET /api/locations/{id}` - Get location by ID
- `GET /api/locations/warehouse/{warehouseId}` - Filter by warehouse
- `POST /api/locations` - Create location
- `PUT /api/locations/{id}` - Update location
- `DELETE /api/locations/{id}` - Delete location

#### ProductStock (Shared for Member 3 & 4)
- `GET /api/product-stocks` - List all stock entries
- `GET /api/product-stocks/{id}` - Get stock by ID
- `GET /api/product-stocks/product/{productId}` - Get stock by product
- `GET /api/product-stocks/warehouse/{warehouseId}` - Get stock by warehouse
- `GET /api/product-stocks/location/{locationId}` - Get stock by location
- `GET /api/product-stocks/product/{productId}/warehouse/{warehouseId}` - Get stock by product and warehouse
- `POST /api/product-stocks` - Create stock entry
- `PUT /api/product-stocks/{id}/quantity?quantity=` - Update stock quantity (for Member 3)
- `DELETE /api/product-stocks/{id}` - Delete stock entry

### Frontend Pages

- **Products** (`/products`) - Product CRUD with search, category filter, stock status filter
- **Categories** (`/categories`) - Category CRUD
- **Warehouses** (`/warehouses`) - Warehouse CRUD
- **Locations** (`/locations`) - Location CRUD with warehouse selection

### Integration Points

#### For Member 3 (Inventory Operations)

Member 3 can use these APIs to perform stock operations:

**Receipts (Stock In):**
1. Select Product: `GET /api/products` or `GET /api/products/search/name?keyword=`
2. Select Warehouse: `GET /api/warehouses`
3. Select Location: `GET /api/locations/warehouse/{warehouseId}`
4. Update Stock: `PUT /api/product-stocks/{id}/quantity?quantity=` (increase quantity)
   OR create new stock entry: `POST /api/product-stocks`

**Deliveries (Stock Out):**
1. Select Product: `GET /api/products`
2. Select Warehouse: `GET /api/warehouses`
3. Select Location: `GET /api/locations/warehouse/{warehouseId}`
4. Update Stock: `PUT /api/product-stocks/{id}/quantity?quantity=` (decrease quantity)

**Transfers:**
1. Get source stock: `GET /api/product-stocks/product/{productId}/warehouse/{sourceWarehouseId}`
2. Get destination: `GET /api/warehouses` and `GET /api/locations/warehouse/{destWarehouseId}`
3. Update source stock: `PUT /api/product-stocks/{sourceId}/quantity?quantity=` (decrease)
4. Update/create destination stock: `PUT /api/product-stocks/{destId}/quantity?quantity=` (increase)

**Adjustments:**
1. Select ProductStock: `GET /api/product-stocks/product/{productId}`
2. Update quantity: `PUT /api/product-stocks/{id}/quantity?quantity=`

#### For Member 4 (Dashboard + Stock Ledger + History)

Member 4 can use these APIs for reporting:

**Dashboard:**
- Total Products: `GET /api/products`
- Out of Stock: `GET /api/products/status/out-of-stock`
- Low Stock: `GET /api/products/status/low-stock`
- Total Warehouses: `GET /api/warehouses`
- Stock by Warehouse: `GET /api/product-stocks/warehouse/{warehouseId}`

**Stock Ledger:**
- All stock entries: `GET /api/product-stocks`
- Stock by Product: `GET /api/product-stocks/product/{productId}`
- Stock by Warehouse: `GET /api/product-stocks/warehouse/{warehouseId}`
- Stock by Location: `GET /api/product-stocks/location/{locationId}`

**Low Stock Reporting:**
- `GET /api/products/status/low-stock` - Returns products with stock <= reorder level
- Each product includes: name, sku, currentStock, reorderLevel, category

**History:**
- ProductStock entities have `createdAt` and `updatedAt` timestamps
- Can be used to track stock changes over time

### Running the Project

**Backend (Spring Boot):**
```bash
cd d:/Indumathi/stocksense
mvn spring-boot:run
```
Backend runs on: http://localhost:8080
H2 Console: http://localhost:8080/h2-console

**Frontend (React):**
```bash
cd d:/Indumathi/stocksense/frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### Seed Data

The application includes seed data that loads on startup:
- 3 Categories: Electronics, Hardware, Raw Materials
- 2 Warehouses: Main Warehouse (WH001), Secondary Warehouse (WH002)
- 3 Locations: Rack A1, Rack A2 (in WH001), Rack B1 (in WH002)
- 4 Products: Steel Rod, Copper Wire, LED Display, Microcontroller
- 4 ProductStock entries with various quantities

### Validation Rules

**Product:**
- name: required
- sku: required, unique
- category: required
- unitOfMeasure: required
- reorderLevel: >= 0
- currentStock: >= 0

**Warehouse:**
- name: required
- code: required, unique

**Location:**
- warehouse: required
- code: required

**Category:**
- name: required, unique

### Files Created

**Backend:**
- `pom.xml` - Maven configuration
- `src/main/resources/application.properties` - Spring Boot config
- `src/main/java/com/stocksense/StockSenseApplication.java` - Main application
- `src/main/java/com/stocksense/entity/` - All entity classes
- `src/main/java/com/stocksense/repository/` - All repository interfaces
- `src/main/java/com/stocksense/service/` - All service classes
- `src/main/java/com/stocksense/controller/` - All REST controllers
- `src/main/java/com/stocksense/config/DataInitializer.java` - Seed data

**Frontend:**
- `package.json` - Dependencies
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `index.html` - HTML entry
- `src/index.css` - Global styles
- `src/main.jsx` - React entry
- `src/App.jsx` - Main app with routing
- `src/api.js` - API client
- `src/pages/Products.jsx` - Product management page
- `src/pages/Categories.jsx` - Category management page
- `src/pages/Warehouses.jsx` - Warehouse management page
- `src/pages/Locations.jsx` - Location management page

### Remaining Integration Work

1. **Member 1 (Authentication)**: Once implemented, add JWT authentication to all API endpoints
2. **Member 3 (Inventory Operations)**: Use the ProductStock API to update quantities
3. **Member 4 (Dashboard)**: Use the product and stock APIs for reporting
4. **Database Migration**: For production, replace H2 with PostgreSQL/MySQL
5. **Error Handling**: Add global exception handling for better error responses
6. **Logging**: Add comprehensive logging for audit trails

### Notes

- The module does NOT perform stock-changing operations (that's Member 3's responsibility)
- Stock status is calculated based on currentStock vs reorderLevel
- ProductStock entity is designed for shared access by Members 3 and 4
- All entities use JPA timestamps for tracking changes
- CORS is configured for frontend-backend communication
