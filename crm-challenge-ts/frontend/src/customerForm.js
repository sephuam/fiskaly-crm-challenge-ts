import React, { useState } from 'react';
import axios from 'axios';


export default function CustomerForm({onCustomerAdded}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic input validation
        if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
            setMessage("Names can only contain letters.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage("Invalid email address.");
            return;
        }

        try {
            const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
            const url = `${BACKEND_URL}/customers`;
            const response = await axios.post(url, { firstName, lastName, email });
            setMessage(response.data.message || "Customer added successfully!");
            setFirstName('');
            setLastName('');
            setEmail('');
            onCustomerAdded();
        } catch (error) {
            console.error(error);
            setMessage("Failed to add customer.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <div>
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Add Customer</button>
            <p>{message}</p>
        </form>
    );
}