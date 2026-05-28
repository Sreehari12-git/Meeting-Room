import { useState } from "react"
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        try {
            const data = await loginUser(email,password);
            console.log("Login success:",data)
            navigate('/admin');
        }
        catch(error:any) {
            console.log(error);
            alert(error.response?.data?.message || "Login failed")
        }
    }

    return (
        <>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </>
    )   
}

export default Login

