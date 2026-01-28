import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { CommentEntity } from "./comment.entity";

enum PostStatus {
    PUBLISHED = 'published',
    ARCHIVED = 'archived',
}

@Entity({
    name: 'posts',
})
export class PostEntity extends BaseEntity {
    
    @Column({
        name: 'title',
        type: 'varchar',
        length: 255,
    })
    title: string;

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
        name: 'status',
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.PUBLISHED,
    })
    status: PostStatus;

    @Column({
        name: 'comments_count',
        type: 'int',
        default: 0,
    })
    commentsCount: number;


    @OneToMany(() => CommentEntity, comment => comment.post)
    comments: CommentEntity[];
}

export { PostStatus };