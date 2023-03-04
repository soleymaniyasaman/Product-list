import { Outlet, Link, useNavigate } from "react-router-dom";
import { BiPlay } from 'react-icons/bi';
import { BsFillBellFill, BsFillGridFill } from 'react-icons/bs';
import { useSelector } from "react-redux";
import { selectAllPosts } from "../data/postsSlice";

const Layout = () => {
    const posts = useSelector(selectAllPosts)
    const navigate = useNavigate();

    const onAddPostClicked = () => {
        navigate('/posts/add')
    }
    return (
        <div className="container bg-gray-200 h-full p-6">
            <nav className="bg-gray-100 px-4 py-2 flex items-center justify-between ">
                <div className="flex items-center">
                    <button
                        className="p-2 mr-2 mt-1 bg-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <BiPlay className="bg-blue-600 text-white" />
                    </button>
                    <button
                        className="p-2 font-bold">
                        Arbit Blog
                    </button>

                </div>
                <div className="">
                    <div className="flex items-center">
                        <button type="button" className="flex items-center font-bold mt-4 mb-4 float-right bg-blue-600 px-3 py-2 rounded-md text-white" onClick={onAddPostClicked}>
                            New Post
                        </button>
                        <Link to={'/'} className="flex-grow text-gray-500 mx-2 font-bold relative w-20 text-center align-text-bottom">
                            Posts
                            <sup className="absolute bg-green-600 text-white rounded-full text-xs -top-2 p-1">{posts.length}</sup>
                        </Link>
                        <span className="flex-grow text-right text-gray-500 mx-2 ">
                            <BsFillBellFill />
                        </span>
                        <span className="flex-grow text-right text-gray-500 mx-2">
                            <BsFillGridFill />
                        </span>
                        <span className="flex-grow text-right  mx-2">
                            <div className="bg-cover bg-center bg-no-repeat p-4 rounded-full" style={{ backgroundImage: `url(${require("../images/profile.jpg")})` }}></div>
                        </span>
                    </div>
                </div>
            </nav>
            <div className="bg-gray-100 px-8 py-10 mt-6">
                <Outlet />
            </div>
        </div>
    )
}
export default Layout;
