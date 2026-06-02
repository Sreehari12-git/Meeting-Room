import { useEffect, useState } from "react";
import { createUser, deleteUser, getAllUsers, updateUser } from "../../api/userApi";

function AddUser() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState("");

  const addUser = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await createUser(name, password, email, role);
      setMessage({ type: "success", text: "User created successfully!" });
      setName(""); setPassword(""); setEmail(""); setRole("");
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create user. Please try again." });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    setUsersLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      setUsersError("Failed to load users. Please try again.");
      console.log(error);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => { getUser(); }, []);

  const delUser = async (email: string) => {
    try {
      await deleteUser(email);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const updUser = async (email: string, data: any) => {
    try {
      await updateUser(email, data);
      setSelectedUser(null);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const roleStyle: Record<string, string> = {
    ADMIN: "bg-blue-100 text-blue-700",
    EMPLOYEE: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Leave blank to keep unchanged"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 border border-gray-300 text-gray-600 text-sm font-medium rounded px-4 py-2 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => updUser(selectedUser.email, { name: editName, email: editEmail, password: editPassword, role: editRole })}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded px-4 py-2"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-800">Create User</h1>
        <p className="text-sm text-gray-500 mt-1">Add a new team member and assign their role</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-lg">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-sm border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-600"
          }`}>
            {message.type === "success" ? "✓ " : "⚠ "}{message.text}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass + " cursor-pointer"}>
              <option value="">Select role</option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
          <button onClick={addUser} disabled={loading}
            className="flex-1 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {loading ? "Creating..." : "Create User"}
          </button>
          <button onClick={() => { setName(""); setPassword(""); setEmail(""); setRole(""); setMessage(null); }}
            className="px-5 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors">
            Clear
          </button>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200 pb-5 mt-10">
        <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your team members</p>
      </div>

      {usersLoading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm py-10 justify-center">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          Loading users...
        </div>
      )}

      {usersError && !usersLoading && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          <span>{usersError}</span>
          <button onClick={getUser} className="text-red-600 underline hover:text-red-800 ml-4">Retry</button>
        </div>
      )}

      {!usersLoading && !usersError && users.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-3xl mb-3">👥</p>
          <p className="text-sm">No users found.</p>
        </div>
      )}

      {!usersLoading && !usersError && users.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{user.name || "—"}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleStyle[user.role] || "bg-gray-100 text-gray-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button
                      onClick={() => delUser(user.email)}
                      className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setEditName(user.name);
                        setEditEmail(user.email);
                        setEditPassword("");
                        setEditRole(user.role);
                      }}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddUser;