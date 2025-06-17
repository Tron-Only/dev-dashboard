import { useState } from "react";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { Trash } from "lucide-react";

interface TodoItemProps {
	task: string;
	key: number | string;
	completed: boolean;
}

export default function TodoItem(props: TodoItemProps) {
	const [completed, setCompleted] = useState(props.completed);
	function handleChecked() {
		setCompleted(!completed);
	}
	return (
		<>
			<li>
				<div className="flex items-center justify-between">
					<Checkbox className="mr-3" onClick={handleChecked} />
					<span
						className={`strike-through ${completed ? "completed text-muted-foreground" : ""}`}
					>
						{props.task}
					</span>
				</div>
			</li>
		</>
	);
}
