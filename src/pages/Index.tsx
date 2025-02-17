
import React, { useState } from "react";
import { Task } from "@/types/Task";
import TaskList from "@/components/TaskList";
import AddTaskButton from "@/components/AddTaskButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast({
        title: "Task title required",
        description: "Please enter a title for your task.",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Math.random().toString(36).substring(7),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      createdAt: new Date(),
    };

    setTasks([task, ...tasks]);
    setNewTask({ title: "", description: "" });
    setIsDialogOpen(false);
    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    });
  };

  const handleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
    toast({
      title: "Task updated",
      description: "Task status has been updated.",
    });
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted.",
    });
  };

  return (
    <div className="container max-w-2xl py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Tasks</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your tasks efficiently
        </p>
      </header>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <TaskList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                placeholder="Enter task title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Enter task description"
              />
            </div>
            <Button type="submit" className="w-full">
              Add Task
            </Button>
          </form>
        </DialogContent>

        <AddTaskButton onClick={() => setIsDialogOpen(true)} />
      </Dialog>
    </div>
  );
};

export default Index;
