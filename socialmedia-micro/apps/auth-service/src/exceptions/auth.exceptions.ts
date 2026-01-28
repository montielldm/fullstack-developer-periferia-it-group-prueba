import { HttpStatus } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

export class InvalidCredentialsException extends RpcException {
    constructor() {
        super({
            status: HttpStatus.UNAUTHORIZED,
            message: 'Invalid credentials',
            data: null,
            timestamp: new Date().toISOString()
        })
    }
}

export class UserServiceUnavailableException extends RpcException {
    constructor() {
        super({
            status: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'User service is temporarily unavailable',
            data: null,
            timestamp: new Date().toISOString()
        })
    }
}

export class InvalidTokenException extends RpcException {
    constructor() {
        super({
            status: HttpStatus.UNAUTHORIZED,
            message: 'Invalid or expired token',
            data: null,
            timestamp: new Date().toISOString()
        })
    }
}

export class MicroserviceCommunicationException extends RpcException {
    constructor(message: string = 'Microservice communication error') {
        super({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message,
            data: null,
            timestamp: new Date().toISOString()
        })
    }
}