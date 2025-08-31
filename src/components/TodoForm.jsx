import { useState } from "react";

import { postData } from "../api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlinePlus } from "react-icons/hi";

function TodoForm() {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  //   Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  // 1. You might have mismatching versions of React and the renderer (such as React DOM)
  // 2. You might be breaking the Rules of Hooks
  // 3. You might have more than one copy of React in the same app
  // See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem

  const handleSubmit = (e) => {
    console.log("I am inside the handle Submit Method");

    e.preventDefault();

    const object = { title, description };

    console.log(typeof title, typeof description);

    console.log(object);

    mutation.mutateAsync(object);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["postdata"],
    mutationFn: postData,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["TodoQuery"] });

      setTitle("");

      setDescription("");
    },
  });

  if (mutation.isPending)
    return <h1 className="text-left  mt-28 ml-2">Loading...</h1>;

  return (
    <>
      <section className="mt-3">
        <form>
          <div className="flex flex-col justify-center items-center gap-4  p-4">
            {/* Title Input */}
            <div className="flex w-1/2 items-center">
              <input
                type="text"
                placeholder="Enter title"
                onChange={({ target }) => setTitle(target.value)}
                className="border px-2 py-1 rounded w-full"
                value={title}
              />
              <svg
                className="h-4 w-4 text-red-600 mb-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M11 3h2v7.05l6.06-3.5 1 1.73L14 12l6.06 3.72-1 1.73L13 13.95V21h-2v-7.05l-6.06 3.5-1-1.73L10 12 3.94 8.28l1-1.73L11 10.05V3z"
                />
              </svg>
            </div>

            {/* Description Input */}
            <div className="flex w-1/2 items-start">
              <textarea
                placeholder="Enter Description"
                onChange={({ target }) => setDescription(target.value)}
                className="border px-2 py-1 rounded w-full"
                value={description}
              />
              <svg
                className="h-4 w-4 text-red-600 ml-1 mb-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M11 3h2v7.05l6.06-3.5 1 1.73L14 12l6.06 3.72-1 1.73L13 13.95V21h-2v-7.05l-6.06 3.5-1-1.73L10 12 3.94 8.28l1-1.73L11 10.05V3z"
                />
              </svg>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <HiOutlinePlus className="inline mb-1" />
              <span>Add</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default TodoForm;
