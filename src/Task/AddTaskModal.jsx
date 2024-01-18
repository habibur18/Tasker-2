import React, { useState } from "react";

export default function AddTaskModal({ onSave, taskToUpdate, onCloseClick }) {
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavourite: false,
    }
  );
  const [isAdd, seIsAdd] = useState(Object.is(taskToUpdate, null));
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({ ...task, [name]: value });
  };
  const isFormValid = (e) => {
    e.preventDefault();
    // Check if required fields are not empty
    const isValid = task.title.trim() !== "" && task.description.trim() !== "" && task.priority !== "";
    if (!isValid) {
      alert("Please fill all required fields");
    }
    onSave(task, isAdd);
  };
  return (
    <>
      <div className="bg-black bg-opacity-70 min-h-screen w-full z-10 absolute inset-0"></div>
      <form onSubmit={(e) => isFormValid(e)} className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">{isAdd ? "Add New Task" : "Update Task"}</h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input value={task.title} onChange={(e) => handleChange(e)} className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5" type="text" name="title" id="title" required />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea value={task.description} onChange={(e) => handleChange(e)} className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]" type="text" name="description" id="description" required></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input value={task.tags} onChange={(e) => handleChange(e)} className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5" type="text" name="tags" id="tags" required />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select value={task.priority} onChange={(e) => handleChange(e)} className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5" name="priority" id="priority" required>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-between lg:mt-20">
          <button onClick={onCloseClick} className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80">
            Close
          </button>
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
