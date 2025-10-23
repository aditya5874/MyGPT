 import { useState } from "react";
 import { useAuth } from "./AuthContext";
 import { Link } from "react-router-dom";
 import "./Auth.css";
import blackLogo from "/frontend/src/assets/blacklogo.png";
 function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const { login } = useAuth();

   // --- 1. ADD STATE FOR THE TOGGLER ---
   const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
     e.preventDefault();
     setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
         headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
       });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to log in");
      }
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
     }
   };

   return (
     <div className="auth-page">
       <div className="auth-box">
         <div className="auth-header">
           <img
             src={blackLogo}
             alt="MyGPT Logo"
             className="auth-logo"
           />
           <h1>MyGPT</h1>
         </div>

         <form onSubmit={handleLogin}>
           <h2>Welcome Back 👋</h2>
           {error && <p className="error-message">{error}</p>}
           <input
             type="email"
             placeholder="Email Address"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />

           {/* --- 2. REPLACE THE PASSWORD INPUT WITH THIS WRAPPER --- */}
           <div className="password-wrapper">
             <input
               type={showPassword ? "text" : "password"}
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
             />
             <i
               className={`password-toggle-icon ${
                 showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
               }`}
               onClick={() => setShowPassword(!showPassword)}
             ></i>
           </div>
           {/* --- END OF CHANGE --- */}

           <button type="submit">Login</button>
           <p className="auth-link">
             Don't have an account? <Link to="/signup">Create one</Link>
           </p>
         </form>
       </div>
     </div>
   );
 }

 export default Login;
