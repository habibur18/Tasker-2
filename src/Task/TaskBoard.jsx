import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskList from "./TaskList";
import TasksActions from "./TasksActions";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "learn react",
    description: "learn react from scratch. I want do couple of project with react",
    tags: ["react", "js", "web"],
    priority: "High",
    isFavourite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddAndEditTask = (newTask, isAdd) => {
    // console.log("add task", newTask);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowModal(false);
  };
  const handleEditTask = (updatedTask) => {
    setTaskToUpdate(updatedTask);
    setShowModal(true);
  };

  // close modal
  function handleCloseModal() {
    setShowModal(false);
    setTaskToUpdate(null);
  }

  // delete a task by id
  function handleDelete(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }
  // delete all tasks
  function onDeleteAllOnClick() {
    tasks.splice(0, tasks.length);
    setTasks([...tasks]);
  }
  return (
    <section className="mb-20 " id="tasks">
      {showModal && <AddTaskModal onSave={handleAddAndEditTask} taskToUpdate={taskToUpdate} onCloseClick={handleCloseModal} />}
      <div className="container mx-auto">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TasksActions onAddClick={() => setShowModal(true)} onDeleteAllOnClick={onDeleteAllOnClick} />
          <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDelete} />
        </div>
      </div>
    </section>
  );
}
