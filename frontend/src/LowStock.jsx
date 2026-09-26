
function LowStock({ onDashboard }) {
  const products = [
    {
      name: "Steel Sheet",
      sku: "STL-001",
      category: "Raw Material",
      warehouse: "Warehouse A",
      currentStock: 5,
      reorderLevel: 20,
      unit: "kg",
    },
    {
      name: "Copper Wire",
      sku: "COP-014",
      category: "Electrical",
      warehouse: "Warehouse B",
      currentStock: 8,
      reorderLevel: 25,
      unit: "kg",
    },
    {
      name: "Aluminium Rod",
      sku: "ALU-021",
      category: "Raw Material",
      warehouse: "Warehouse A",
      currentStock: 12,
      reorderLevel: 30,
      unit: "kg",
    },
    {
      name: "Plastic Sheet",
      sku: "PLS-008",
      category: "Packaging",
      warehouse: "Warehouse B",
      currentStock: 15,
      reorderLevel: 40,
      unit: "pcs",
    },
    {
      name: "Bearing",
      sku: "BRG-031",
      category: "Components",
      warehouse: "Warehouse A",
      currentStock: 4,
      reorderLevel: 15,
      unit: "pcs",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-10 h-16 border-b bg-white">
        <div className="flex h-full items-center justify-between px-6">

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg text-white">
              📦
            </div>

            <h1 className="text-xl font-bold text-gray-800">
              StockSense
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-xl">🔔</span>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                M
              </div>

              <span className="font-medium text-gray-700">
                Member
              </span>
            </div>
          </div>

        </div>
      </header>


      {/* Sidebar */}
      <aside className="fixed top-16 bottom-0 left-0 hidden w-60 border-r bg-white md:block">

        <nav className="p-4">

          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main
          </p>

          <button
            onClick={onDashboard}
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100"
          >
            📊
            <span>Dashboard</span>
          </button>

          <button className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100">
            📦
            <span>Products</span>
          </button>


          <p className="mb-2 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Operations
          </p>

          <button className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100">
            📥
            <span>Receipts</span>
          </button>

          <button className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100">
            📤
            <span>Delivery Orders</span>
          </button>

          <button className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100">
            🔧
            <span>Inventory Adjustment</span>
          </button>

          <button className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100">
            🔄
            <span>Move History</span>
          </button>

        </nav>
      </aside>


      {/* Main */}
      <main className="pt-16 md:pl-60">

        <div className="p-6">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Low Stock Items
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Products that are below their reorder level
            </p>
          </div>


          {/* Alert */}
          <div className="mb-6 flex items-center gap-4 rounded-xl border border-red-200 bg-red-50 p-5">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
              ⚠️
            </div>

            <div>
              <h3 className="font-semibold text-red-700">
                Stock Attention Required
              </h3>

              <p className="text-sm text-red-600">
                {products.length} products are currently below their reorder level.
              </p>
            </div>

          </div>


          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b p-5">
              <h3 className="font-semibold text-gray-800">
                Products Below Reorder Level
              </h3>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="bg-gray-50 text-xs uppercase text-gray-500">

                  <tr>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Warehouse</th>
                    <th className="px-5 py-3">Current Stock</th>
                    <th className="px-5 py-3">Reorder Level</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>

                </thead>

                <tbody className="divide-y">

                  {products.map((product) => (

                    <tr
                      key={product.sku}
                      className="hover:bg-gray-50"
                    >

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-700">
                          {product.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          SKU: {product.sku}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-500">
                        {product.category}
                      </td>

                      <td className="px-5 py-4 text-gray-500">
                        {product.warehouse}
                      </td>

                      <td className="px-5 py-4 font-semibold text-red-600">
                        {product.currentStock} {product.unit}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {product.reorderLevel} {product.unit}
                      </td>

                      <td className="px-5 py-4">

                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                          Low Stock
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default LowStock