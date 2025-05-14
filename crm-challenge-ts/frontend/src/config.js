import * as envSchema from 'env-schema';

export const config = {
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost',
  BACKEND_PORT: process.env.REACT_APP_BACKEND_PORT || '3001'
};

export const schema = {
  type: 'object',
  required: Object.keys(config), // all properties are required!
  properties: config,
};

export default envSchema({ schema });
