
import React from "react";
import { Task } from "@/types/Task";
import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskList = ({ tasks, onComplete, onDelete }: TaskListProps) => {
  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
