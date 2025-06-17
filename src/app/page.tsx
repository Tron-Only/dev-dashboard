import TodoList from "@/components/TodoList";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<ModeToggle />
			<TodoList />
		</div>
	);
}
