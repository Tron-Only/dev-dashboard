"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [rotation, setRotation] = useState(0); // New rotation state

	useEffect(() => setMounted(true), []);

	const handleClick = () => {
		setRotation((prev) => prev + 180); // Rotate 180° on each click

		// Change theme after a slight delay for smooth animation
		setTimeout(() => setTheme(theme === "dark" ? "light" : "dark"), 250);
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={handleClick}
			className="cursor-pointer"
		>
			<Sun
				className={`h-[1.2rem] w-[1.2rem] absolute transition-transform duration-500 ${
					theme === "light" ? "scale-100" : "scale-0"
				}`}
				style={{ transform: `rotate(${rotation}deg)` }}
			/>
			<Moon
				className={`h-[1.2rem] w-[1.2rem] transition-transform duration-500 ${
					theme === "dark" ? "scale-100" : "scale-0"
				}`}
				style={{ transform: `rotate(${rotation}deg)` }}
			/>

			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
