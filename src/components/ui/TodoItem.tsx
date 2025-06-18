import { useState } from "react";
import { Checkbox } from "./checkbox";

interface TodoItemProps {
	task: string;
	key: number | string;
	completed: boolean;
	onToggle: () => void;
}

export default function TodoItem({ task, completed, onToggle }: TodoItemProps) {
	return (
		<>
			<li>
				<div className="flex items-center justify-between">
					<Checkbox
						className="mr-3 cursor-pointer"
						checked={completed}
						onCheckedChange={onToggle}
					/>
					<span
						className={`strike-through ${completed ? "completed text-muted-foreground" : ""}`}
					>
						{task}
					</span>
				</div>
			</li>
		</>
	);
}
