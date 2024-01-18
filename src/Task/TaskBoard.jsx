import React, { useState } from "react";
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
  const [tasks, setTasks] = useState([]);
  return (
    <section className="mb-20 " id="tasks">
      <div className="container mx-auto">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TasksActions />
          <TaskList />
        </div>
      </div>
    </section>
  );
}
