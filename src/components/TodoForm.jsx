import { useState } from "react";

import { postData } from "../api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlinePlus } from "react-icons/hi";
import { Outlet } from "react-router-dom";

function TodoForm() {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [msg, setMsg] = useState("");

  //   Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  // 1. You might have mismatching versions of React and the renderer (such as React DOM)
  // 2. You might be breaking the Rules of Hooks
  // 3. You might have more than one copy of React in the same app
  // See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem

  const handleSubmit = (e) => {
    e.preventDefault();
    const object = { title, description };

    // mutation.mutateAsync((object) => console.log(object));
    mutation.mutateAsync(object);
    setMsg(mutation?.data?.data?.message);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["postdata"],
    mutationFn: postData,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["TodoQuery"] });
    },
  });

  // console.log(mutation?.data?.message);

  // console.log(mutation.data.data.message);

  // console.log(mutation.data?.data?.data);

  // const data = mutation.data;

  // console.log("Hello");

  if (mutation.isPending) return <h1 className="text-center">Loading...</h1>;

  return (
    <>
      <section className="mt-3">
        <form>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={handleSubmit}>
              <HiOutlinePlus className="inline mb-1" />
              <span>Add</span>
            </button>
          </div>

          <div className="text-green-500 flex justify-center">{msg}</div>
        </form>
      </section>
    </>
  );
}

export default TodoForm;
