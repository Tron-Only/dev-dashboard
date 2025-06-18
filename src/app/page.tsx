import TodoList from "@/components/TodoList";
import { ModeToggle } from "@/components/ModeToggle";
import PomodoroTimer from "@/components/Pomodoro";
import SnippetsBox from "@/components/Snippetsbox";

export default function Home() {
	return (
		<>
			<div className="absolute right-2 top-2">
				<ModeToggle />
			</div>
			<div className="grid grid-cols-3 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<TodoList />
				<PomodoroTimer />
				<SnippetsBox />
			</div>
		</>
	);
}
