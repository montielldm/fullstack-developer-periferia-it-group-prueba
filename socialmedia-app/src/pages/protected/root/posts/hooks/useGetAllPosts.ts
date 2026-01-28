import { useQuery } from "@tanstack/react-query";
import { getPostsService } from "../services/posts.services";

export default function useGetAllPosts() {
    const query = useQuery({
        queryKey: ["posts"],
        queryFn: getPostsService,
    });
    return query;
}