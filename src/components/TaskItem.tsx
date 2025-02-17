
import React from "react";
import { Task } from "@/types/Task";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onComplete, onDelete }: TaskItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "group relative flex items-center gap-4 rounded-lg border p-4 transition-all",
        "task-shadow hover:task-shadow-hover",
        "bg-card text-card-foreground"
      )}
    >
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onComplete(task.id)}
            className="h-5 w-5"
          />
          <h3 className={cn(
            "font-medium leading-none transition-all",
            task.completed && "text-muted-foreground line-through"
          )}>
            {task.title}
          </h3>
        </div>
        {task.description && (
          <p className={cn(
            "text-sm text-muted-foreground",
            task.completed && "line-through"
          )}>
            {task.description}
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "p-2 text-muted-foreground hover:text-destructive"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </motion.div>
  );
};

export default TaskItem;
