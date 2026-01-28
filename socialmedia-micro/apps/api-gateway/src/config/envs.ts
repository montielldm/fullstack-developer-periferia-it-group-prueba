import * as dotenv from 'dotenv';
import { join } from 'path';
import * as joi from 'joi';

dotenv.config({
  path: join(process.cwd(), './apps/api-gateway/.env'),
});

interface EnvVars {
    PORT: number;
    HOST: string;
    AUTH_SERVICE_PORT: number;
    AUTH_SERVICE_HOST: string;
    USERS_SERVICE_PORT: number;
    USERS_SERVICE_HOST: string;
    POSTS_SERVICE_PORT: number;
    POSTS_SERVICE_HOST: string;
}

const envVarsSchema = joi.object<EnvVars>({
    PORT: joi.number().default(3000),
    HOST: joi.string().required(),
    AUTH_SERVICE_PORT: joi.number().default(3002),
    AUTH_SERVICE_HOST: joi.string().required(),
    USERS_SERVICE_PORT: joi.number().default(3003),
    USERS_SERVICE_HOST: joi.string().required(),
    POSTS_SERVICE_PORT: joi.number().default(3004),
    POSTS_SERVICE_HOST: joi.string().required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate( process.env );

if ( error ) {
    throw new Error( `Config validation error: ${ error.message }` );
}

export const envVars = value;

export const envs = {
    port: envVars.PORT,
    host: envVars.HOST,
    auth_service_port: envVars.AUTH_SERVICE_PORT,
    auth_service_host: envVars.AUTH_SERVICE_HOST,
    users_service_port: envVars.USERS_SERVICE_PORT,
    users_service_host: envVars.USERS_SERVICE_HOST,
    posts_service_port: envVars.POSTS_SERVICE_PORT,
    posts_service_host: envVars.POSTS_SERVICE_HOST,
}