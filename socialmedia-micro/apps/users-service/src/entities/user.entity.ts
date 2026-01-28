import { Entity, Column } from "typeorm";
import { BaseEntity } from "../config/base.entity";

enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

@Entity({
    name: 'users',
})
export class UserEntity extends BaseEntity {
    
    @Column({
        name: 'first_name',
    })
    firstName: string;

    @Column({
        name: 'last_name',
    })
    lastName: string;

    @Column({ 
        unique: true,
        name: 'email',
    })
    email: string;

    @Column({
        name: 'password',
    })
    password: string;

    @Column({ 
        name: 'status',
        type: 'enum', 
        enum: UserStatus, 
        default: UserStatus.ACTIVE
    })
    status: UserStatus;
}