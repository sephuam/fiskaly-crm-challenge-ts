import { FastifyInstance, FastifyRequest } from 'fastify';
import { addCustomer, getAllCustomers, getCustomer } from '../db/queries';

// Define types for route parameters
interface CustomerParams {
    id: string;
}

// Define types for request body
interface CustomerBody {
    firstName: string;
    lastName: string;
    email: string;
}

export default async function customerRoutes(fastify: FastifyInstance) {
    // Get all customers
    fastify.get('/customers', async (request, reply) => {
        try {
            const customers = await getAllCustomers();
            reply.send(customers);
        } catch (err) {
            fastify.log.error(err);
            reply.status(500).send({ error: 'Failed to fetch customers' });
        }
    });

    // Get a single customer by ID
    fastify.get<{ Params: CustomerParams }>('/customers/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const customer = await getCustomer(id);
            if (!customer) {
                reply.status(404).send({ error: 'Customer not found' });
                return;
            }
            reply.send(customer);
        } catch (err) {
            fastify.log.error(err);
            reply.status(500).send({ error: 'Failed to fetch customer' });
        }
    });

    // Add a new customer
    fastify.post<{ Body: CustomerBody }>('/customers', async (request, reply) => {
        try {
            const { firstName, lastName, email } = request.body;

            // Validate input
            if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
                reply.status(400).send({ error: 'Names must contain only letters' });
                return;
            }

            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                reply.status(400).send({ error: 'Invalid email address' });
                return;
            }

            const customer = await addCustomer(firstName, lastName, email);
            reply.send({ message: 'Customer created successfully', customer });
        } catch (err) {
            fastify.log.error(err);
            reply.status(500).send({ error: 'Failed to create customer' });
        }
    });
}