import { useState } from "react"

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    return (
        <>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
            <button>Login</button>
        </>
    )   
}

export default Login

