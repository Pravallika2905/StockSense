import { useState } from "react"
import MoveHistory from "./MoveHistory"
import LowStock from "./LowStock"
function App() {
  const [page, setPage] = useState("dashboard")
  const stats = [
    {
      title: "Products in Stock",
      value: "1,250",
      description: "Total units available",
      icon: "📦",
    },
    {
      title: "Low Stock Items",
      value: "12",
      description: "Need attention",
      icon: "⚠️",
    },
    {
      title: "Pending Receipts",
      value: "8",
      description: "Incoming goods",
      icon: "📥",
    },
    {
      title: "Pending Deliveries",
      value: "15",
      description: "Outgoing orders",
      icon: "📤",
    },
    {
      title: "Scheduled Transfers",
      value: "6",
      description: "Internal movements",
      icon: "🔄",
    },
  ]

  const movements = [
    {
      product: "Steel Sheet",
      type: "Receipt",
      quantity: "+100 kg",
      location: "Warehouse A",
      status: "Completed",
    },
    {
      product: "Steel Sheet",
      type: "Transfer",
      quantity: "-20 kg",
      location: "Production Rack",
      status: "Completed",
    },
    {
      product: "Copper Wire",
      type: "Adjustment",
      quantity: "-3 kg",
      location: "Warehouse B",
      status: "Completed",
    },
    {
      product: "Aluminium Rod",
      type: "Delivery",
      quantity: "-25 kg",
      location: "Warehouse A",
      status: "Completed",
    },
  ]
 if (page === "move-history") {
  return <MoveHistory onDashboard={() => setPage("dashboard")} />
}
if (page === "low-stock") {
  return <LowStock onDashboard={() => setPage("dashboard")} />
}
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* ================= HEADER ================= */}
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
            <button className="text-xl text-gray-500 hover:text-gray-800">
              🔔
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                M
              </div>

              <span className="hidden font-medium text-gray-700 sm:block">
                Member
              </span>
            </div>
          </div>

        </div>
      </header>


      {/* ================= SIDEBAR ================= */}
      <aside className="fixed top-16 bottom-0 left-0 hidden w-60 border-r bg-white md:block">

        <nav className="p-4">

          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main
          </p>

          <button className="mb-1 flex w-full items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 font-semibold text-blue-600">
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


          <p className="mb-2 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Settings
          </p>

          <button className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100">
            ⚙️
            <span>Warehouse</span>
          </button>

          <button className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100">
            👤
            <span>My Profile</span>
          </button>

        </nav>
      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="pt-16 md:pl-60">

        <div className="p-6">

          {/* Page title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Overview of your inventory and stock operations
            </p>
          </div>


          {/* ================= KPI CARDS ================= */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-800">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {stat.description}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg">
                    {stat.icon}
                  </div>

                </div>

              </div>
            ))}

          </div>


          {/* ================= LOWER SECTION ================= */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">


            {/* LOW STOCK */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-1">

              <div className="flex items-center justify-between border-b p-5">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Low Stock Alerts
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Products that need attention
                  </p>
                </div>

                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  12 Items
                </span>
              </div>


              <div className="divide-y">

                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-gray-700">
                      Steel Sheet
                    </p>
                    <p className="text-xs text-gray-400">
                      SKU: STL-001
                    </p>
                  </div>

                  <span className="font-semibold text-red-600">
                    5 kg
                  </span>
                </div>


                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-gray-700">
                      Copper Wire
                    </p>
                    <p className="text-xs text-gray-400">
                      SKU: COP-014
                    </p>
                  </div>

                  <span className="font-semibold text-red-600">
                    8 kg
                  </span>
                </div>


                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-gray-700">
                      Aluminium Rod
                    </p>
                    <p className="text-xs text-gray-400">
                      SKU: ALU-021
                    </p>
                  </div>

                  <span className="font-semibold text-orange-500">
                    12 kg
                  </span>
                </div>

              </div>

              <div className="border-t p-4">
                <button
  onClick={() => setPage("low-stock")}
  className="w-full rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
>
  View All Low Stock
</button>
              </div>

            </div>


            {/* RECENT MOVEMENTS */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">

              <div className="flex items-center justify-between border-b p-5">

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Recent Stock Movements
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Latest inventory transactions
                  </p>
                </div>

                <button
  onClick={() => setPage("move-history")}
  className="text-sm font-medium text-blue-600 hover:underline"
>
  View History
</button>

              </div>


              {/* Table */}
              <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                  <thead className="bg-gray-50 text-xs uppercase text-gray-500">

                    <tr>
                      <th className="px-5 py-3">
                        Product
                      </th>

                      <th className="px-5 py-3">
                        Type
                      </th>

                      <th className="px-5 py-3">
                        Quantity
                      </th>

                      <th className="px-5 py-3">
                        Location
                      </th>

                      <th className="px-5 py-3">
                        Status
                      </th>
                    </tr>

                  </thead>


                  <tbody className="divide-y">

                    {movements.map((movement, index) => (

                      <tr
                        key={index}
                        className="hover:bg-gray-50"
                      >

                        <td className="px-5 py-4 font-medium text-gray-700">
                          {movement.product}
                        </td>

                        <td className="px-5 py-4 text-gray-500">
                          {movement.type}
                        </td>

                        <td
                          className={`px-5 py-4 font-semibold ${
                            movement.quantity.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {movement.quantity}
                        </td>

                        <td className="px-5 py-4 text-gray-500">
                          {movement.location}
                        </td>

                        <td className="px-5 py-4">

                          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                            {movement.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default App