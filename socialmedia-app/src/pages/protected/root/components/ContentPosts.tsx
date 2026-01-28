import useGetAllPosts from "../posts/hooks/useGetAllPosts"
import CardPost from "./CardPost";
import ErrorCard from "./ErrorCard";
import LoadingCard from "./LoadingCard";
export default function ContentPosts() {
    const { data: posts, isLoading, isError } = useGetAllPosts();

    if(isLoading) {
        return <LoadingCard />
    }

    if(isError) {
        return <ErrorCard />
    }
    return (
        <div>
            <div className="space-y-2">
                {posts && posts.map((post) => (
                    <CardPost key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
