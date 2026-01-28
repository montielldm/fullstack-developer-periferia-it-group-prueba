import { HttpStatus } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

export class UserNotFoundException extends RpcException {
    constructor() {
        super({
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
            data: null,
            timestamp: new Date()
        })
    }
}

export class UserAlreadyExistsException extends RpcException {
    constructor() {
        super({
            status: HttpStatus.BAD_REQUEST,
            message: 'User with this email already exists',
            data: null,
            timestamp: new Date()
        })
    }
}