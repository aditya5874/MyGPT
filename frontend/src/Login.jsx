// import { useState } from "react";
// import { useAuth } from "./AuthContext";
// import { Link } from "react-router-dom";
// import "./Auth.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const { login } = useAuth();

//   // --- 1. ADD STATE FOR THE TOGGLER ---
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || "Failed to log in");
//       }
//       login(data.token, data.user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-box">
//         <div className="auth-header">
//           <img
//             src="src/assets/blacklogo.png"
//             alt="MyGPT Logo"
//             className="auth-logo"
//           />
//           <h1>MyGPT</h1>
//         </div>

//         <form onSubmit={handleLogin}>
//           <h2>Welcome Back 👋</h2>
//           {error && <p className="error-message">{error}</p>}
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           {/* --- 2. REPLACE THE PASSWORD INPUT WITH THIS WRAPPER --- */}
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <i
//               className={`password-toggle-icon ${
//                 showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
//               }`}
//               onClick={() => setShowPassword(!showPassword)}
//             ></i>
//           </div>
//           {/* --- END OF CHANGE --- */}

//           <button type="submit">Login</button>
//           <p className="auth-link">
//             Don't have an account? <Link to="/signup">Create one</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
// Add a simple CSS file for this if you like, e.g., Auth.css

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to log in");
      }

      // Backend sends { message, token, user: { id, name, email } }
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      {" "}
      {/* Style this container */}
      <form onSubmit={handleLogin}>
        <h2>Login to MyGPT</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
