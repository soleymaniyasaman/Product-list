import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { fetchPosts, selectAllPosts } from "../data/postsSlice";

const PostList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector((state) => state.posts.loading)


    useEffect(() => {
        if (!postStatus) {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    return (
        <div className="container">
            {posts.loading && <div>Loading ...</div>}
            {!posts.loading && posts.error ? <div>Error:{posts.error}</div> : null}
            {!posts.loading && posts.length ?
                (<div className="grid grid-cols-3 gap-x-16 gap-y-8">
                    {posts.map(post => (
                        <Card key={post.id} postId={post.id} title={post.title} body={post.body} />
                    ))}
                </div>) : null

            }
        </div>
    );
};

export default PostList;
