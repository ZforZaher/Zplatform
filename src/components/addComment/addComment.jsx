import { useState, useContext } from "react";
import { themeContext } from "../Context/themeContext";
import { tokenContext } from "../Context/tokenContext";
import { addComment } from "../../Api/addComment.api";
import ukP from "../../assets/ukprofile.webp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AddComment({ postId }) {
  const { theme } = useContext(themeContext);
  const { userData } = useContext(tokenContext);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      toast.success("Comment added successfully!", {
        duration: 3000,
        style: {
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#f9fafb" : "#111827",
          border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
        },
      });
      setContent(""); // Clear input after success
      queryClient.invalidateQueries({ queryKey: ["getComments", postId] });
    },
    onError: (error) => {
      toast.error("Failed to add comment");
      console.error("Comment error:", error);
    }
  });

  function postComment() {
    if (content.trim()) {
      mutate({
        content: content,
        post: postId,
      });
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      postComment();
    }
  };

  return (
    <>
      <div className="flex items-start mb-4">
        <img
          src={ userData?.photo ||ukP}
          alt="Your Avatar"
          className="w-9 h-9 rounded-full mt-1 me-2"
          onError={(e) => (e.target.src = ukP)}
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write a comment..."
          className="input w-full rounded-2xl bg-transparent text-gray-800 dark:text-Tdark dark:bg-darkLr border focus:outline-gray-300 dark:focus:outline-gray-600 border-gray-300 dark:border-gray-600 me-2"
        />
        <button
          onClick={postComment}
          disabled={isPending || !content.trim()}
          className="btn bg-black dark:bg-light text-white dark:text-Tlight border border-black dark:border-white hover:bg-white dark:hover:bg-darkLr hover:text-black dark:hover:text-white transition-all duration-300 rounded-full px-2 py-1 text-sm disabled:opacity-50"
        >
          {isPending ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Comment"
          )}
        </button>
      </div>
    </>
  );
}