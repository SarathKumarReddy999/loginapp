import React, { useState } from "react";
import './PasswordChange.css';
import { useNavigate } from 'react-router-dom';

function PasswordChange() {

    const [mail, setEmail] = useState('');
    const [password, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm_password) {
            setError('Passwords do not match');
            setSuccess('');
        } else {
            setError('');

            // Example API call using fetch to send the password to the backend
            try {
                const response = await fetch('http://localhost:8086/api/v1/changePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ mail, password }),
                });

                if (response.ok) {
                    setSuccess('Password updated successfully!. Login to proceed');
                    setError('');
                    
                    // Show the success alert, then navigate to home
                    window.alert("Password updated successfully! Please log in.");
                    navigate("/"); // Navigate to home after alert
                } else {
                    setError('Failed to update password');
                    setSuccess('');
                }
            } catch (error) {
                setError('An error occurred');
                setSuccess('');
            }
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div className="user">
                    <input
                        type="text"  // Better to specify email type for validation
                        value={mail}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="newPassword">
                    <input
                        type="password"  // Use password type for security
                        value={password}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                    />
                </div>

                <div className="confirmPassword">
                    <input
                        type="password"  // Use password type for security
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button type="submit">Change</button>
            </form>
        </div>
    );
}

export default PasswordChange;
