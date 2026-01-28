import * as dotenv from 'dotenv';
import { join } from 'path';
import * as joi from 'joi';

dotenv.config({
  path: join(process.cwd(), './apps/posts-service/.env'),
});

interface EnvVars {
    PORT: number;
    HOST: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    USERS_SERVICE_HOST: string;
    USERS_SERVICE_PORT: number;
}

const envVarsSchema = joi.object<EnvVars>({
    PORT: joi.number().default(3000),
    HOST: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
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
    db_host: envVars.DB_HOST,
    db_port: envVars.DB_PORT,
    db_username: envVars.DB_USERNAME,
    db_password: envVars.DB_PASSWORD,
    db_name: envVars.DB_NAME,
    user_service_host: envVars.USERS_SERVICE_HOST,
    user_service_port: envVars.USERS_SERVICE_PORT,
}