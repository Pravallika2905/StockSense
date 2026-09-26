import { useState } from "react"

function MoveHistory({ onDashboard }) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [statusFilter, setStatusFilter] = useState("All Statuses")

  // Dummy data for now.
  // Later this array will come from the backend API.
  const movements = [
    {
      id: 1,
      date: "26 Sep 2026",
      time: "10:30 AM",
      product: "Steel Sheet",
      sku: "STL-001",
      type: "Receipt",
      quantity: "+100 kg",
      from: "Supplier",
      to: "Warehouse A",
      reference: "REC-001",
      status: "Completed",
    },
    {
      id: 2,
      date: "26 Sep 2026",
      time: "11:15 AM",
      product: "Steel Sheet",
      sku: "STL-001",
      type: "Transfer",
      quantity: "-20 kg",
      from: "Warehouse A",
      to: "Production Rack",
      reference: "TRF-004",
      status: "Completed",
    },
    {
      id: 3,
      date: "26 Sep 2026",
      time: "12:05 PM",
      product: "Copper Wire",
      sku: "COP-014",
      type: "Adjustment",
      quantity: "-3 kg",
      from: "Warehouse B",
      to: "Warehouse B",
      reference: "ADJ-002",
      status: "Completed",
    },
    {
      id: 4,
      date: "25 Sep 2026",
      time: "03:20 PM",
      product: "Aluminium Rod",
      sku: "ALU-021",
      type: "Delivery",
      quantity: "-25 kg",
      from: "Warehouse A",
      to: "Customer",
      reference: "DEL-008",
      status: "Completed",
    },
    {
      id: 5,
      date: "25 Sep 2026",
      time: "04:45 PM",
      product: "Copper Wire",
      sku: "COP-014",
      type: "Receipt",
      quantity: "+50 kg",
      from: "Supplier",
      to: "Warehouse B",
      reference: "REC-009",
      status: "Completed",
    },
    {
      id: 6,
      date: "24 Sep 2026",
      time: "09:10 AM",
      product: "Steel Sheet",
      sku: "STL-001",
      type: "Transfer",
      quantity: "-15 kg",
      from: "Warehouse A",
      to: "Production Rack",
      reference: "TRF-003",
      status: "Completed",
    },
  ]

  // Automatically create the location list from the movement data.
  // When backend data changes later, this list will change automatically.
  const locations = [
    ...new Set(
      movements.flatMap((movement) =>
        [movement.from, movement.to].filter(
          (location) =>
            location &&
            location !== "-" &&
            location !== "Supplier" &&
            location !== "Customer"
        )
      )
    ),
  ]

  const getTypeStyle = (type) => {
    switch (type) {
      case "Receipt":
        return "bg-green-50 text-green-700"

      case "Delivery":
        return "bg-red-50 text-red-700"

      case "Transfer":
        return "bg-blue-50 text-blue-700"

      case "Adjustment":
        return "bg-orange-50 text-orange-700"

      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  const filteredMovements = movements.filter((movement) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      movement.product.toLowerCase().includes(searchText) ||
      movement.sku.toLowerCase().includes(searchText) ||
      movement.reference.toLowerCase().includes(searchText)

    const matchesType =
      typeFilter === "All Types" ||
      movement.type === typeFilter

    const matchesLocation =
      locationFilter === "All Locations" ||
      movement.from === locationFilter ||
      movement.to === locationFilter

    const matchesStatus =
      statusFilter === "All Statuses" ||
      movement.status === statusFilter

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesStatus
    )
  })

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

            <button
              type="button"
              className="text-xl text-gray-500 hover:text-gray-800"
            >
              🔔
            </button>

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
            type="button"
            onClick={onDashboard}
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100"
          >
            📊
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100"
          >
            📦
            <span>Products</span>
          </button>


          <p className="mb-2 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Operations
          </p>

          <button
            type="button"
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100"
          >
            📥
            <span>Receipts</span>
          </button>

          <button
            type="button"
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100"
          >
            📤
            <span>Delivery Orders</span>
          </button>

          <button
            type="button"
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100"
          >
            🔧
            <span>Inventory Adjustment</span>
          </button>

          <button
            type="button"
            className="mb-1 flex w-full items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 font-semibold text-blue-600"
          >
            🔄
            <span>Move History</span>
          </button>


          <p className="mb-2 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Settings
          </p>

          <button
            type="button"
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100"
          >
            ⚙️
            <span>Warehouse</span>
          </button>

          <button
            type="button"
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-100"
          >
            👤
            <span>My Profile</span>
          </button>

        </nav>
      </aside>


      {/* Main */}
      <main className="pt-16 md:pl-60">

        <div className="p-6">

          {/* Page heading */}
          <div className="mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Move History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track all inventory movements and stock adjustments
            </p>

          </div>


          {/* Filters */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

              {/* Search */}
              <div className="lg:col-span-2">

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Search
                </label>

                <input
                  type="text"
                  placeholder="Search product, SKU or reference..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Movement Type */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Movement Type
                </label>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="All Types">All Types</option>
                  <option value="Receipt">Receipt</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Adjustment">Adjustment</option>
                </select>

              </div>


              {/* Location */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>

                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="All Locations">
                    All Locations
                  </option>

                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>

              </div>


              {/* Status */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="All Statuses">
                    All Statuses
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>

              </div>

            </div>

          </div>


          {/* Summary cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Movements
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-800">
                156
              </p>
            </div>


            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Receipts
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                42
              </p>
            </div>


            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Deliveries
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                51
              </p>
            </div>


            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Transfers
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                63
              </p>
            </div>

          </div>


          {/* Movement table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b p-5">

              <div>
                <h3 className="font-semibold text-gray-800">
                  Stock Ledger
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Complete record of inventory movements
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Export
              </button>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="bg-gray-50 text-xs uppercase text-gray-500">

                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Quantity</th>
                    <th className="px-5 py-3">From</th>
                    <th className="px-5 py-3">To</th>
                    <th className="px-5 py-3">Reference</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>

                </thead>


                <tbody className="divide-y">

                  {filteredMovements.length > 0 ? (

                    filteredMovements.map((movement) => (

                      <tr
                        key={movement.id}
                        className="hover:bg-gray-50"
                      >

                        {/* Date */}
                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="font-medium text-gray-700">
                            {movement.date}
                          </p>

                          <p className="text-xs text-gray-400">
                            {movement.time}
                          </p>
                        </td>


                        {/* Product */}
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-700">
                            {movement.product}
                          </p>

                          <p className="text-xs text-gray-400">
                            {movement.sku}
                          </p>
                        </td>


                        {/* Type */}
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${getTypeStyle(
                              movement.type
                            )}`}
                          >
                            {movement.type}
                          </span>
                        </td>


                        {/* Quantity */}
                        <td
                          className={`whitespace-nowrap px-5 py-4 font-semibold ${
                            movement.quantity.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {movement.quantity}
                        </td>


                        {/* From */}
                        <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                          {movement.from}
                        </td>


                        {/* To */}
                        <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                          {movement.to}
                        </td>


                        {/* Reference */}
                        <td className="px-5 py-4 font-medium text-blue-600">
                          {movement.reference}
                        </td>


                        {/* Status */}
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                            {movement.status}
                          </span>
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td
                        colSpan="8"
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        No movements found for the selected filters.
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* Pagination */}
            <div className="flex items-center justify-between border-t p-4">

              <p className="text-sm text-gray-500">
                Showing {filteredMovements.length} of 156 movements
              </p>

              <div className="flex gap-2">

                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-500"
                >
                  Previous
                </button>

                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
                >
                  1
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
                >
                  2
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
                >
                  3
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
                >
                  Next
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default MoveHistory