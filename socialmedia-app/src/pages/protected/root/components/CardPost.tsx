import React from 'react'
import type { Post } from '../posts/models/posts.models'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
    post: Post
}

export default function CardPost({ post }: Props) {
    const formatter = new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long', // enero, febrero...
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage src="" alt="Avatar" />
                        <AvatarFallback>{post.author.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{post.author.firstName} {post.author.lastName}</CardTitle>
                        <CardDescription>{post.author.email}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground italic'>{post.content}</p>
            </CardContent>
            <CardFooter>
                <p>{formatter.format(new Date(post.createdAt))}</p>
            </CardFooter>
        </Card>
    )
}
