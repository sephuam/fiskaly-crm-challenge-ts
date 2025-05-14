import pool from './postgres';
import { v4 as uuidv4 } from 'uuid';

// Fetch a single customer
export async function getCustomer(customer_id: string): Promise<any> {
    const queryString = `
        SELECT customer_id, first_name, last_name, mail
        FROM customers
        WHERE customer_id = $1;
    `;
    const values = [customer_id];
    const result = await pool.query(queryString, values);
    return result.rows[0];
}

// Add a new customer
export async function addCustomer(firstName: string, lastName: string, email: string): Promise<any> {
    const customerId = uuidv4();  // Generate a random UUID
    const query = `
        INSERT INTO customers (customer_id, first_name, last_name, mail)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [customerId, firstName, lastName, email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// Fetch all customers
export async function getAllCustomers(): Promise<any[]> {
    const result = await pool.query('SELECT * FROM customers ORDER BY last_name ASC');
    return result.rows;
}