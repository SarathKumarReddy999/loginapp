import React, { useState } from "react";
import './DisplayFlag.css';

function DisplayFlag() {

    const [country, setCountry] = useState('');
    const [flagUrl, setFlagUrl] = useState(null); // To store the flag image data
    const [error, setError] = useState('');

    const fetchFlag = async () => {
        try {
            const response = await fetch(`http://localhost:8086/api/v1/getCountryFlag/${country}`);
            if (response.ok) {
                const data = await response.json();
                // Assuming backend returns base64 encoded image
                setFlagUrl(`data:image/jpeg;base64,${data.flag}`);
                setError('');
            } else {
                setError('Country not found or flag unavailable');
                setFlagUrl(null);
            }
        } catch (error) {
            console.error("Error fetching flag:", error);
            setError('An error occurred while fetching the flag.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (country.trim()) {
            fetchFlag(); // Fetch flag when form is submitted
        } else {
            setError('Please enter a valid country');
        }
    };

    return (
        <div className="mainFlag">
            <h2>FLAG IMAGE</h2>
            <form onSubmit={handleSubmit}>
                <div className="country">
                    <input
                        type="text"  
                        name="country"    
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter country"
                        required
                    />
                    <button type="submit">Select</button>
                </div>
            </form>
            {/* Display the flag */}
            {flagUrl && (
                <div className="flag-display">
                    <img src={flagUrl} alt={`${country} flag`} />
                </div>
            )}

            {/* Display error message */}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default DisplayFlag;