import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaUser, FaEye } from 'react-icons/fa';
import { useState } from 'react';
import './Login.css';

function Login() {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log("Submitted Email:", mail);  
    console.log("Submitted Password:", password);  
    
    if (!mail || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:8086/api/v1/validateEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, password }),  
      });
      const result = await response.json();
      
      if (response.ok) {
        if (result.allow) {
          alert("Email successfully validated");

          // Clear the input fields after successful login
          setEmail('');
          setPassword('');
          setRememberMe(false);

          // Navigate to the DisplayFlag component
          navigate('/displayFlag');
        } else {
          alert("Email validation failed");
          setEmail('');
          setPassword('');
          setRememberMe(false);
        }
      } else {
        alert(`Validation failed with status: ${response.status}`);
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="http://localhost:8086/api/v1/validateEmail">
      <div className="wrapper">
        <h1>Login</h1>
        <div className="user">
          <input
            type="text"  
            name="email"  
            autoComplete="email"  
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="password">
          <input
            type="password"  
            name="password"  
            autoComplete="current-password"  
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <FaEye className="icon" />
        </div>
        <div className="remember">
          <label>
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={() => setRememberMe(!rememberMe)} 
            /> Remember me
          </label>
          <button type="submit">Login</button>
        </div>
        <p><Link to="/changePassword">Forgot Password?</Link></p>
        <div className="account-creation">
          <p>New User? <Link to="/signup">Create Account</Link></p>
        </div>
      </div>
    </form>
  );
}

export default Login;
