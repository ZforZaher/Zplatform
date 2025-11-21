import React from "react";
import { useState } from "react";
import noImg from "../../assets/noImg.avif";
import { deletePost } from "../../Api/deletePost.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link } from "react-router-dom";
export default function SinglePost({ post }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      // Invalidate and refetch the posts query
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // if you have a general posts query
    },
    onError: (error) => {
      toast.error("This is not your post, you can not delete it");
      console.error("Delete failed:", error);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(post._id);
    }
  };
  return (
    <>
      <div className="flex items-center  justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img
            src={post.user.photo}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-gray-800 dark:text-Tdark font-semibold">
              {post.user.name}
            </p>
            <p className="text-gray-500  text-sm">
              Posted at {post.createdAt.slice(11, 16)}
            </p>
          </div>
        </div>
        <div className="text-gray-500 cursor-pointer">
          {/* Three-dot menu icon */}
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="btn btn-ghost btn-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 transition-all duration-200 rounded-full p-2"
            title="Delete post"
          >
            {deleteMutation.isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      <p className=" text-md mb-2 ms-1 text-gray-800 dark:text-Tdark">
        {post.body}
      </p>
      {/* Image */}

      <Link to={`/post/${post._id}`}>
        <div className="mb-4 ">
          <img
            src={post.image || noImg}
            onError={(e) => (e.currentTarget.src = noImg)}
            alt="Post Image"
            className="w-full h-fit max-h-100 rounded-md"
          />
        </div>
      </Link>

      {/* Like and Comment Section */}
    </>
  );
}
