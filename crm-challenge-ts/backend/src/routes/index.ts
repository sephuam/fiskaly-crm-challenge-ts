import { FastifyInstance } from 'fastify';
import hello from './helloWorld';
import customerRoutes from './customerRoutes';
import tssRoutes from './tssRoutes';

export default async function(fastify: FastifyInstance) {
    fastify.register(hello);
    fastify.register(customerRoutes);
    fastify.register(tssRoutes);
};
