import React from "react";
import ukP from "../../assets/ukprofile.webp";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "../../Api/getComments.api";
import AddComment from "../addComment/addComment";

export default function CommentItem({ post }) {
  const [like, setLike] = useState(() => {
    const saved = localStorage.getItem("like");
    return saved ? parseInt(saved) : 40;
  });

  function incLike() {
    setLike((prev) => {
      const newLike = prev + 1;
      localStorage.setItem("like", newLike);
      return newLike;
    });
  }

  const { data } = useQuery({
    queryKey: ["getComments", post._id],
    queryFn: () => getPostComments(post?._id),
    select: (data) => data?.comments,
  });

  return (
    <>
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button
            className="cursor-pointer flex justify-center items-center gap-2 px-2 hover:bg-gray-300 dark:hover:bg-gray-800 transition-all ease-in-out rounded-full p-1"
            onClick={() => incLike()}
          >
            <svg
              className="w-5 h-5 text-red-700 fill-current "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="">{like} Likes</span>
          </button>
        </div>
        <button className="cursor-pointer flex justify-center items-center gap-2 px-2 hover:bg-gray-300 dark:hover:bg-gray-800 transition-all ease-in-out rounded-full p-1">
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            className="w-5 h-5  fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
              />
            </g>
          </svg>
          <span>{data?.length || 0} Comment</span>
        </button>
      </div>

      <hr className="mt-2 mb-2" />
      <p className="text-gray-800 dark:text-Tdark font-semibold">Comment</p>
      <hr className="mt-2 mb-2" />

      <div className="mt-4">
        {/* Comment input */}
        <AddComment postId={post?._id} />

        {/* Comments - Only show if they exist */}
        {data && data.length > 0 && (
          <>
            {/* Comment 1 - Only show if it exists */}
            {data[0] && (
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src={data[0]?.commentCreator?.photo}
                  onError={(e) => (e.target.src = ukP)}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="text-gray-800 dark:text-Tdark font-semibold">
                    {data[0]?.commentCreator?.name}
                  </p>
                  <p className="text-gray-500 text-sm">{data[0]?.content}</p>
                </div>
              </div>
            )}

            {/* Comment 2 - Only show if it exists */}
            {data[1] && (
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src={data[1]?.commentCreator?.photo}
                  onError={(e) => (e.target.src = ukP)}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="text-gray-800 dark:text-Tdark font-semibold">
                    {data[1]?.commentCreator?.name}
                  </p>
                  <p className="text-gray-500 text-sm">{data[1]?.content}</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Show message if no comments */}
        {(!data || data.length === 0) && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </>
  );
}