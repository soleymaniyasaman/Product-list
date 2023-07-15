import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { fetchPosts, selectAllPosts } from "../data/postsSlice";

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector((state) => state.posts.loading);
    console.log("posts", posts)
    useEffect(() => {
        if (!postStatus && posts.length === 0) {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch, posts.length]);

    return (
        <div className="container">
            {posts.loading && <div>Loading ...</div>}
            {!posts.loading && posts.error ? <div>Error:{posts.error}</div> : null}
            {!posts.loading && posts.length > 0 && (
                <div className="grid grid-cols-3 gap-x-16 gap-y-8">
                    {posts.map((post) => (
                        <Card key={post.id} postId={post.id} title={post.title} body={post.body} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;
