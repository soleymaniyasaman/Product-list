import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack, BiPencil } from 'react-icons/bi';
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPostsUpdate, fetchPostsDelete, selectPostById } from "../data/postsSlice";

const EditPost = () => {
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, postId));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    console.log("post", post)
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.body);
        }
    }, [post]);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (postId && title && content) {
            const payload = {
                title: title,
                body: content,
            };
            dispatch(fetchPostsUpdate({ payload: payload, postId: postId }));
            navigate('/');
        }
    };

    const onDeletePostClicked = () => {
        dispatch(fetchPostsDelete({ postId: postId }));
        navigate('/');
    };

    const onAddPostClicked = () => {
        navigate('/posts/add');
    };

    return (
        <div className="container">
            <div className="flex items-center text-lg">
                <Link to={'/'} className="flex justify-center items-center px-6 py-5 w-4 relative bg-gray-300 text-black rounded-full text-base mr-4">
                    <BiArrowBack className="absolute" />
                </Link>
                Posts
            </div>
            {post?.loading && <div>Loading ...</div>}
            {!post.loading && post.error ? <div>Error:{post.error}</div> : null}
            {!post.loading && (
                <div className="grid grid-cols-2 gap-x-1 mx-16 mt-8">
                    <div>
                        <button type="button" className="flex items-center font-bold mt-4 mb-4 float-right bg-blue-600 px-3 py-2 rounded-md text-white" onClick={onAddPostClicked}>
                            New Post
                        </button>
                        <form>
                            <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 p-2">
                                Title
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                </div>
                                <textarea
                                    type="text"
                                    name="postTitle"
                                    id="postTitle"
                                    className="flex flex-wrap w-full rounded-md border-gray-300 pl-7 pr-12 py-10 font-bold focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={title}
                                    onChange={onTitleChanged}
                                />
                            </div>
                            <label htmlFor="postDetail" className="block text-sm font-medium text-gray-700 p-2 mt-4">
                                Detail
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                </div>
                                <textarea
                                    type="text"
                                    name="postDetail"
                                    id="postDetail"
                                    className="flex flex-wrap w-full rounded-md border-gray-300 pl-7 pr-12 py-8 font-bold focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={content}
                                    onChange={onContentChanged}
                                />
                            </div>
                            <button type="button" className="flex items-center font-bold mt-4 float-right bg-blue-600 px-3 py-2 rounded-md text-white" onClick={onSavePostClicked}>
                                <BiPencil className="mr-1" />
                                Update
                            </button>
                            <button type="button" className="flex items-center font-bold mt-4 float-right bg-rose-600 px-3 py-2 rounded-md text-white mr-4" onClick={onDeletePostClicked}>
                                <BiPencil className="mr-1" />
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditPost;
