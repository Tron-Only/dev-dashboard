"use client";

import { Card } from "./ui/card";
import { useState, useEffect } from "react";
import TodoItem from "./ui/TodoItem";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Task {
	id: string;
	buttonKey: string;
	name: string;
	completed: boolean;
}

export default function TodoList() {
	const [inputValue, setInputValue] = useState("");
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const newTask: Task = {
				id: uuidv4(),
				buttonKey: uuidv4(),
				name: inputValue,
				completed: false,
			};
			setTasks([...tasks, newTask]);
			setInputValue("");
		}
	};
	const handleDelete = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};
	const handleToggle = (id: string) => {
		setTasks(
			tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
		);
	};

	useEffect(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			setTasks(JSON.parse(savedTasks));
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
	}, [tasks, isLoading]);

	return (
		<>
			<Card className="w-120 px-20">
				<h1 className="text-center">What tasks shall we do today?</h1>
				<input
					type="text"
					name="TaskInput"
					id="TaskInput"
					placeholder="Refactor Code..."
					className="flex min-h-[10px] w-full rounded-md border border-input bg-transparent text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm p-4"
					value={inputValue}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>

				<ul>
					{tasks.map((task) => (
						<div
							key={task.id}
							className="flex justify-between p-3 border m-3 rounded"
						>
							<TodoItem
								key={task.id}
								task={task.name}
								completed={task.completed}
								onToggle={() => handleToggle(task.id)}
							/>
							<Button
								key={task.buttonKey}
								variant="destructive"
								className="cursor-pointer h-7 w-7"
								onClick={() => handleDelete(task.id)}
							>
								<Trash />
							</Button>
						</div>
					))}
				</ul>
			</Card>
		</>
	);
}
