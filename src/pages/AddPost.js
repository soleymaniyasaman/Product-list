import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiArrowBack, BiPencil } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom";
import { addNewPost } from "../data/postsSlice";

const AddNewPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [addRequestStatus, setAddRequestStatus] = useState(false)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const canSave =
        [title, content].every(Boolean) && !addRequestStatus
    console.log(canSave)


    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus(true)
                await dispatch(addNewPost({ title, content, userId: 1 })).unwrap()
                setTitle('')
                setContent('')
                // navigate('/')

            } catch (err) {
                console.error('Failed to save the post: ', err)
            } finally {
                setAddRequestStatus(false)
            }
        }
    }

    const onCancelPostClicked = () => {
        navigate('/')
    }


    return (
        <div className="container">
            <div className="flex items-center text-lg">
                <Link to={'/'} className="flex justify-center items-center px-6 py-5 w-4 relative bg-gray-300 text-black rounded-full text-base mr-4">
                    <BiArrowBack className="absolute" />
                </Link>
                Posts
            </div>
            <div className="grid grid-cols-2 gap-x-1 mx-16 mt-8">
                <div>
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
                            Save
                        </button>
                        <button type="button" className="flex items-center font-bold mt-4 float-right bg-rose-600 px-3 py-2 rounded-md text-white mr-4" onClick={onCancelPostClicked}>
                            <BiPencil className="mr-1" />
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddNewPost;
