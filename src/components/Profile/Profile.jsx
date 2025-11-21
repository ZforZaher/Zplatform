import React, { useContext } from "react";
import { themeContext } from "../Context/themeContext";
import { tokenContext } from "../Context/tokenContext";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getUserPost } from "../../Api/userPost.api";
import SinglePost from "../Singlepost/singlePost";
import CommentItem from "../CommentItem/CommentItem";
import CreatePost from "../Createpost/createPost";
export default function Profile() {
  const { theme } = useContext(themeContext);
  const { userData } = useContext(tokenContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Profile", userData?._id],
    queryFn: () => getUserPost(userData?._id),
  });
  console.log(data);

  if (isLoading) {
    return (
      <div
        className={`${theme} bg-light dark:bg-darkBg w-screen h-screen flex justify-center items-center`}
      >
        <svg
          className="w-12 h-12 text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-900"
          ></path>
        </svg>
      </div>
    );
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <div className="h-screen w-full">
        <div
          className={`${theme}  text-center text-black dark:text-Tdark bg-light dark:bg-darkBg flex flex-col items-center`}
        >
          <div className="p-6 h-75 w-75 mt-10 mb-5 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)]  bg-light dark:bg-darkLr">
            <img
              className="rounded-2xl w-50 bg-amber-600 mx-auto"
              src={userData?.photo}
              alt="...."
            />
            <h1 className={`mt-2`}>{userData.name}</h1>
            <p>{userData.email}</p>
          </div>

          <div className={`${theme} bg-light w-full dark:bg-darkBg `}>
            <div className="">
              <CreatePost />
              {data?.posts
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post) => {
                  return (
                    <div
                      key={post._id}
                      className="flex items-center justify-center "
                    >
                      <div className="bg-light text-start dark:bg-darkLr  p-6 my-5 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] w-[90%] md:w-[60%] lg:w-[60%] xl:w-[50%]">
                        {/* Post */}
                        <SinglePost post={post} />
                        {/* Comments */}
                        <CommentItem post={post} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
