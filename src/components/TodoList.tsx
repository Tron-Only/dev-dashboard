"use client";

import { Card } from "./ui/card";
import { useState } from "react";
import TodoItem from "./ui/TodoItem";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface Task {
	id: string;
	name: string;
	completed: boolean;
}

export default function TodoList() {
	const [inputValue, setInputValue] = useState("");
	const [tasks, setTasks] = useState<Task[]>([]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const newTask: Task = {
				id: Date.now().toString(),
				name: inputValue,
				completed: false,
			};
			setTasks([...tasks, newTask]);
			setInputValue("");
		}
	};

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
						<>
							<div
								key={task.id}
								className="flex justify-between p-3 border m-3 rounded"
							>
								<TodoItem
									key={task.id}
									task={task.name}
									completed={task.completed}
								/>
								<Button
									key={task.id}
									variant="destructive"
									className="cursor-pointer h-7 w-7"
								>
									<Trash />
								</Button>
							</div>
						</>
					))}
				</ul>
			</Card>
		</>
	);
}
