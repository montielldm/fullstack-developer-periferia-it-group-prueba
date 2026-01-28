import { api } from "@/helpers/axios.helpers";
import type { Post, PostCreation } from "../models/posts.models";

export const getPostsService = async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>("/posts");
    return data;
}

export const createPostService = async (post: PostCreation): Promise<Post> => {
    const { data } = await api.post<Post>("/posts", post);
    return data;
}