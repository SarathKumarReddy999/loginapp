import { FaUser, FaEye } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    console.log("Entered Email:", mail);  // Check if email is set correctly
    console.log("Entered Password:", password);  // Check if password is set correctly
    
    if (!mail || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:8086/api/v1/createAccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, password }),  // Ensure email and password are sent in body
      });
      const result = await response.json();
      
      if (response.ok) {
        if (result.status === "success") {
          alert("Account is created succesfully. Login to proceed");
          navigate("/");
        } else {
          alert("Account creation failed. Please try after sometime");
        }
      } else {
        alert("Account creation failed. Please try after sometime");
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="wrapper">
        <h1>SignUp</h1>
        <div className="user">
          <input
            type="text"  // Better to specify email type for validation
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="password">
          <input
            type="password"  // Use password type for security
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <FaEye className="icon" />
        </div>
        <div className="submit">
          <button type="submit">SignUp</button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
