
import React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton = ({ onClick }: AddTaskButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 p-4 rounded-full",
        "bg-primary text-primary-foreground",
        "float-button-shadow transition-all",
        "hover:brightness-110"
      )}
    >
      <Plus className="h-6 w-6" />
    </motion.button>
  );
};

export default AddTaskButton;
