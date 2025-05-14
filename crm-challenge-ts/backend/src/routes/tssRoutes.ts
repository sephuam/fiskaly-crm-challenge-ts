import { v4 as uuidv4 } from 'uuid';
import pool from '../db/postgres';

async function tssRoutes(fastify: { post: (arg0: string, arg1: (request: any, reply: any) => Promise<any>) => void; }, options: any) {
    
    fastify.post('/tss/:customerId', async (request, reply) => {
        const customerId = request.params.customerId;
        const newTssId = uuidv4();

        try {
            
            const customerCheck = await pool.query(
                'SELECT customer_id, first_name, last_name, mail FROM customers WHERE customer_id = $1',
                [customerId]
            );

            if (customerCheck.rows.length === 0) {
                return reply.status(404).send({ message: 'Customer not found' });
            }

            const customer = customerCheck.rows[0];

            await pool.query(
                'INSERT INTO customers (customer_id,first_name,last_name,mail,tss_id) VALUES ($1, $2, $3, $4, $5)',
                [customerId, customer.first_name, customer.last_name, customer.mail, newTssId]
            );

            reply.status(200).send({ message: 'New TSS created successfully!', tssId: newTssId });
        } catch (error) {
            console.error(error);
            reply.status(500).send({ message: 'Failed to create new TSS' });
        }
    });
}

export default tssRoutes;