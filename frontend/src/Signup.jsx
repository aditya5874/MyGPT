// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   // --- 1. ADD STATE FOR THE TOGGLER ---
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || "Failed to sign up");
//       }

//       setSuccess("Account created! Please log in.");
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
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

//         <form onSubmit={handleSignup}>
//           <h2>Create Account ✨</h2>
//           {error && <p className="error-message">{error}</p>}
//           {success && <p className="success-message">{success}</p>}

//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
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
//               minLength={6}
//             />
//             <i
//               className={`password-toggle-icon ${
//                 showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
//               }`}
//               onClick={() => setShowPassword(!showPassword)}
//             ></i>
//           </div>
//           {/* --- END OF CHANGE --- */}

//           <button type="submit">Sign Up</button>
//           <p className="auth-link">
//             Already have an account? <Link to="/">Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
// You can re-use the same Auth.css file you might have made for Login.jsx

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    // Optional: Add password confirmation logic here if you want

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up");
      }

      // Backend sends { message, token, user: { id, name, email } }
      // We log the user in immediately after they sign up
      login(data.token, data.user);

      // We don't need navigate('/') here because
      // the login() function in AuthContext already handles it.
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      {" "}
      {/* Style this container */}
      <form onSubmit={handleSignup}>
        <h2>Create Account for MyGPT</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          minLength={6} // Good to match your backend model validation
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;


// export default Signup;
