import { Link } from "react-router-dom";

const Card = ({ postId, title, body }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <p className="text-xs text-gray-500">card-body</p>
      <div className="px-10">
        <div className="flex-col">
          <div className="font-bold mb-16 pb-16">{title}</div>
          <div className="">{body}</div>
          <Link
            to={`/posts/${postId}`}
            className="button flex items-center font-bold mt-4 float-right bg-blue-600 px-3 py-2 rounded-md text-white"
          >
            Edit post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
