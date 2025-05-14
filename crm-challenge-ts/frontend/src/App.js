import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerForm from './customerForm.js';
import CustomerTable from './customerTable.js';

export default function App() {
    const [customers, setCustomers] = useState([]);

    const loadCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/customers');
            const groupedCustomers = response.data.reduce((acc, customer) => {
                const { customer_id, first_name, last_name, mail, tss_id } = customer;
                if (!acc[customer_id]) {
                    acc[customer_id] = {
                        customer_id,
                        first_name,
                        last_name,
                        mail,
                        tss_ids: [],
                    };
                }
                acc[customer_id].tss_ids.push(tss_id);
                return acc;
            }, {});
            
            setCustomers(Object.values(groupedCustomers));
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <div>
            <h1>Customer Management</h1>
            <CustomerForm onCustomerAdded={loadCustomers} />
            <CustomerTable customers={customers} onCustomerAdded={loadCustomers} />
        </div>
    );
}