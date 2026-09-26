import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Warehouses from './pages/Warehouses'
import Locations from './pages/Locations'
import { Package, FolderOpen, Warehouse, MapPin } from 'lucide-react'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">StockSense</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    <Package className="w-4 h-4 mr-1" />
                    Products
                  </Link>
                  <Link to="/categories" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    <FolderOpen className="w-4 h-4 mr-1" />
                    Categories
                  </Link>
                  <Link to="/warehouses" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    <Warehouse className="w-4 h-4 mr-1" />
                    Warehouses
                  </Link>
                  <Link to="/locations" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1" />
                    Locations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/locations" element={<Locations />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
