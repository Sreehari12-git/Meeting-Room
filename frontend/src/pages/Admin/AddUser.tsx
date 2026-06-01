import { useState } from "react";
import { createUser } from "../../api/userApi";

function AddUser() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

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

  const inputClass = `
    w-full bg-[#0d1117] border border-[#30363d]
    text-[#e6edf3] text-sm rounded-lg px-4 py-2.5
    outline-none transition-all duration-200
    placeholder-[#484f58]
    focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/15
    hover:border-[#484f58]
  `;

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-8">
      <div className="w-full max-w-5xl grid grid-cols-5 gap-12 items-center">
        <div className="col-span-2 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#818cf8] text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] inline-block"></span>
              Admin Panel
            </span>
            <h1 className="text-[#e6edf3] text-4xl font-bold leading-tight tracking-tight mt-3">
              Create a<br />new user
            </h1>
            <p className="text-[#7d8590] text-sm leading-relaxed mt-4">
              Add team members and assign their roles. They'll receive access based on their permissions level.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
              <div className="w-8 h-8 rounded-lg bg-[#6366f1]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#818cf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-[#e6edf3] text-xs font-semibold">Admin</p>
                <p className="text-[#7d8590] text-xs mt-0.5">Full system access, manage rooms and users</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
              <div className="w-8 h-8 rounded-lg bg-[#238636]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#3fb950]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[#e6edf3] text-xs font-semibold">Employee</p>
                <p className="text-[#7d8590] text-xs mt-0.5">View and book rooms, limited access</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl shadow-black/40">
            {message && (
              <div className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm border ${
                message.type === "success"
                  ? "bg-[#1a3a2a] border-[#238636]/50 text-[#3fb950]"
                  : "bg-[#3a1a1a] border-[#da3633]/50 text-[#f85149]"
              }`}>
                <span className="text-base">{message.type === "success" ? "✓" : "✕"}</span>
                <span>{message.text}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 space-y-1.5">
                <label className="text-[#7d8590] text-[11px] font-semibold tracking-widest uppercase">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className={inputClass}
                />
              </div>

              <div className="col-span-2 space-y-1.5">
                <label className="text-[#7d8590] text-[11px] font-semibold tracking-widest uppercase">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#7d8590] text-[11px] font-semibold tracking-widest uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#7d8590] text-[11px] font-semibold tracking-widest uppercase">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputClass + " cursor-pointer appearance-none"}
                >
                  <option value="" className="bg-[#161b22]">Select role</option>
                  <option value="ADMIN" className="bg-[#161b22]">Admin</option>
                  <option value="EMPLOYEE" className="bg-[#161b22]">Employee</option>
                </select>
              </div>
            </div>

            <div className="border-t border-[#21262d] my-6" />
            <div className="flex items-center gap-3">
              <button
                onClick={addUser}
                disabled={loading}
                className="flex-1 bg-[#6366f1] hover:bg-[#5558e8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide rounded-lg py-2.5 transition-all duration-150 active:scale-[0.98] shadow-lg shadow-[#6366f1]/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Creating...
                  </span>
                ) : "Create User"}
              </button>
              <button
                onClick={() => { setName(""); setPassword(""); setEmail(""); setRole(""); setMessage(null); }}
                className="px-5 py-2.5 text-[#7d8590] hover:text-[#e6edf3] text-sm font-medium border border-[#30363d] hover:border-[#484f58] rounded-lg transition-all duration-150"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;