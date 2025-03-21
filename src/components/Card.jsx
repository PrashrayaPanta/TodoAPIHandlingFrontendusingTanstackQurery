import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../api";

const Card = ({ title: initialTitle, description: initialDescription, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedDescription, setEditedDescription] =
    useState(initialDescription);

  const mutationUpdate = useMutation({
    mutationKey: ["updateTododata"],
    mutationFn: updateTodo,
    onSuccess: (data) => {
      setTitle(editedTitle); // Update title with new value
      setDescription(editedDescription); // Update description with new value
      setIsEditing(false); // Exit edit mode on successful update
    },
  });

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleDeleteTodo = () => {
    mutationdelete.mutate(id);
  };

  const queryClient = useQueryClient();
  const mutationdelete = useMutation({
    mutationKey: ["deleteTododata"],
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TodoQuery"] });
    },
  });

  const handleSave = () => {
    mutationUpdate.mutate({
      id,
      title: editedTitle,
      description: editedDescription,
    });
  };

  if (mutationdelete.isPending) return <h1>Loading...</h1>;

  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div className="p-6">
        {isEditing ? (
          <>
            <input
              type="text"
              className="block mb-2 w-full p-2 border rounded"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="block w-full p-2 border rounded"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {title}
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {description}
            </p>
          </>
        )}
      </div>
      <div className="p-6 pt-0">
        {isEditing ? (
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-500 text-white shadow-md shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mr-2"
            type="button"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={handleDeleteTodo}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
