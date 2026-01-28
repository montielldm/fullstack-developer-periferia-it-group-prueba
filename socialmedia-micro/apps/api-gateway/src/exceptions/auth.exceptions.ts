import { HttpStatus } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

export class UnauthorizedException extends RpcException {
    constructor() {
        super({
            status: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized access',
            data: null,
            timestamp: new Date()
        })
    }
}