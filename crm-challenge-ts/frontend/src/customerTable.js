import React, { useState } from 'react';
import axios from 'axios';

export default function CustomerTable({ customers, onCustomerAdded }) {
    const [filter, setFilter] = useState('');

    const handleAddTss = async (customerId) => {
        try {
            const response = await axios.post(`http://localhost:3001/tss/${customerId}`);
            alert(response.data.message);
            onCustomerAdded();
        } catch (error) {
            console.error("Error adding TSS:", error);
            alert("Failed to add TSS.");
        }
    };

    const filteredCustomers = customers.filter(c => {
        if (!filter.trim()) return true;
        console.log("Filter here")
        return c && c.last_name && c.last_name.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <div>
            <input 
                type="text" 
                placeholder="Filter by last name" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                style={{ marginBottom: '20px' }}
            />
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>tss</th>
                    </tr>
                </thead>
                <tbody>
                {filteredCustomers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.mail}</td>
                            <td>
                                {customer.tss_ids.join(', ')}
                                </td>
                                <td>
                                <button onClick={() => handleAddTss(customer.customer_id)}>
                                    Add TSS
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}