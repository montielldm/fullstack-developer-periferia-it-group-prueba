import * as dotenv from 'dotenv';
import { join } from 'path';
import * as joi from 'joi';

dotenv.config({
  path: join(process.cwd(), './apps/auth-service/.env'),
});

interface EnvVars {
    PORT: number;
    HOST: string;
    JWT_SECRET: string;
    USERS_SERVICE_HOST: string;
    USERS_SERVICE_PORT: number;
}

const envVarsSchema = joi.object<EnvVars>({
    PORT: joi.number().default(3002),
    HOST: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    USERS_SERVICE_HOST: joi.string().required(),
    USERS_SERVICE_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate( process.env );

if ( error ) {
    throw new Error( `Config validation error: ${ error.message }` );
}

export const envVars = value;

export const envs = {
    port: envVars.PORT,
    host: envVars.HOST,
    jwt_secret: envVars.JWT_SECRET,
    users_service_host: envVars.USERS_SERVICE_HOST,
    users_service_port: envVars.USERS_SERVICE_PORT,
}