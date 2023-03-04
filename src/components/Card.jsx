import { Link } from "react-router-dom";

const Card = ({ postId, title, body }) => {
  return (
    <div>
      <p className="text-xs text-gray-500">card-body</p>
      <div className="px-10">
        <div className="flex-col">
          <div className="font-bold mb-16 pb-16">{title}</div>
          <div className="">{body}</div>
          <Link to={`/posts/${postId}`} className="button muted-button">
            View Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
