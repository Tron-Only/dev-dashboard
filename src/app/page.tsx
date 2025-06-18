import TodoList from "@/components/TodoList";
import { ModeToggle } from "@/components/ModeToggle";
import PomodoroTimer from "@/components/Pomodoro";

export default function Home() {
	return (
		<div className="flex gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<ModeToggle />
			<TodoList />
			<PomodoroTimer />
		</div>
	);
}
