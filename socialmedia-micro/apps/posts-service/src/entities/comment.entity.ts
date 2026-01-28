import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { PostEntity } from "./post.entity";

enum CommentStatus {
    PUBLISHED = 'published',
    HIDDEN = 'hidden',
    DELETED = 'deleted',
}

@Entity({
    name: 'comments',
})
export class CommentEntity extends BaseEntity {
    
    @Column({
        name: 'content',
        type: 'text',
    })
    content: string;

    @Column({
        name: 'author_id',
        type: 'int',
    })
    authorId: number;

    @Column({
        name: 'post_id',
        type: 'int',
    })
    postId: number;

    @Column({
        name: 'status',
        type: 'enum',
        enum: CommentStatus,
        default: CommentStatus.PUBLISHED,
    })
    status: CommentStatus;


    @ManyToOne(() => PostEntity, post => post.comments)
    @JoinColumn({ name: 'post_id' })
    post: PostEntity;
}

export { CommentStatus };