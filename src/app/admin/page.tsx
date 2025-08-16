import React from "react";

const AdminPanel: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 font-bold text-purple-700 text-2xl">AdminPanel</div>
        <nav className="mt-8">
          {["Dashboard", "Users", "Analytics", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-700">Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg"
            />
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
              SR
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SummaryCard
              label="Total Users"
              value="1,240"
              color="text-purple-700"
            />
            <SummaryCard
              label="Revenue"
              value="$24,500"
              color="text-green-600"
            />
            <SummaryCard label="New Orders" value="320" color="text-blue-600" />
            <SummaryCard
              label="Pending Tickets"
              value="12"
              color="text-red-500"
            />
          </div>

          {/* User List Table */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b font-bold text-purple-700">
              User List
            </div>
            <table className="w-full text-left">
              <thead className="bg-purple-50">
                <tr>
                  {["Name", "Email", "Role", "Status"].map((head) => (
                    <th key={head} className="p-4">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4">John Doe</td>
                  <td className="p-4">john@example.com</td>
                  <td className="p-4">Admin</td>
                  <td className="p-4 text-green-600 font-bold">Active</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">Jane Smith</td>
                  <td className="p-4">jane@example.com</td>
                  <td className="p-4">Editor</td>
                  <td className="p-4 text-yellow-500 font-bold">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionButton color="purple" label="Add User" />
            <ActionButton color="blue" label="Export Data" />
            <ActionButton color="green" label="Generate Report" />
            <ActionButton color="red" label="Delete Records" />
          </div>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="w-20 h-20 rounded-full shadow"
            />
            <div>
              <h3 className="text-xl font-bold text-purple-700">Sophia Ray</h3>
              <p className="text-gray-500">Administrator</p>
              <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white p-4 mt-10 text-center text-sm text-gray-400 border-t">
            © 2025 AdminPanel. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

// Reusable sub-components

interface SummaryCardProps {
  label: string;
  value: string;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <p className="text-sm text-gray-500">{label}</p>
    <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
  </div>
);

interface ActionButtonProps {
  label: string;
  color: "purple" | "blue" | "green" | "red";
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, color }) => {
  const baseColor = {
    purple: "bg-purple-600 hover:bg-purple-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  }[color];

  return (
    <button className={`text-white py-3 rounded-lg shadow ${baseColor}`}>
      {label}
    </button>
  );
};
