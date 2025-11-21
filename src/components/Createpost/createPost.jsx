import React, { useContext, useState } from "react";
import { themeContext } from "../Context/themeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../Api/createPost";
import { toast } from "sonner";
export default function CreatePost() {
  const { theme } = useContext(themeContext);
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const queryClient = useQueryClient();

  const { data, mutate, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: createPost,
  });

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size is too large. Please select an image smaller than 2MB', {
          duration: 4000,
        });
        return;
      }
    }
    setImage(file);
    setImgSrc(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImage(null);
    setImgSrc("");
  }

  function handleAddPost() {
    const formData = new FormData();
    if (body) {
      formData.append("body", body);
    }
    if (image) {
      formData.append("image", image);
    }
    // mutate is used to send the data as a form

    mutate(formData, {
      onSuccess: () => {
        toast.success("Post created successfully!", {
          duration: 3000,
          style: {
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f9fafb" : "#111827",
            border:
              theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
          },
        });
        setBody("");
        setImage(null);
        setImgSrc("");
        queryClient.invalidateQueries({ queryKey: ["Profile"] });
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      },
      // onError: (error) => {
      //   console.error("Post creation failed:", error);
      // },
       onError: (error) => {
      // Error toast
      toast.error('Failed to create post', {
        duration: 4000,
        style: {
          background: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fecaca',
        },
      });
      console.error("Post creation failed:", error);
    },
    });
  }

  return (
    <>
      <div
        className={`${theme}   mx-auto w-[90%] md:w-[40%] lg:w-[40%] xl:w-[40%]  pt-10`}
      >
        <div className="card  bg-light dark:bg-darkLr text-gray-800 dark:text-Tdark shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-2xl p-4">
          <textarea
            className="textarea textarea-bordered w-full h-[30px] bg-light dark:bg-darkLr text-gray-800 dark:text-Tdark border-darkBg focus:outline-2 focus:outline-black dark:focus:outline-light dark:border-light resize-none rounded-2xl"
            placeholder="What's on your mind?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>

          {imgSrc && (
            <div className="mt-3 " id="imagePreview">
              <div className="relative">
                <img
                  src={imgSrc}
                  className="w-full h-fit object-cover rounded-xl"
                  alt="preview"
                />
                <button
                  onClick={handleRemoveImage}
                  className="btn btn-xs btn-circle absolute top-2 right-2 shadow"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <label className="cursor-pointer">
              <input
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <div className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2" // Changed from stroke-width
                >
                  <path
                    strokeLinecap="round" // Changed from stroke-linecap
                    strokeLinejoin="round" // Changed from stroke-linejoin
                    d="M21.44 11.05l-9.19 9.19a5.5 5.5 0 01-7.78-7.78l9.19-9.19a3.5 3.5 0 015 5l-9.2 9.19a1.5 1.5 0 01-2.12-2.12l8.13-8.12"
                  />
                </svg>
              </div>
            </label>

            <button
              onClick={handleAddPost}
              disabled={isPending || (!body.trim() && !image)}
              className="btn bg-black dark:bg-light text-white dark:text-Tlight border border-black dark:border-white hover:bg-white dark:hover:bg-darkLr hover:text-black dark:hover:text-white transition-all duration-300 rounded-full px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
