"use client";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";

// Predefined session configurations
type PresetConfig = {
	work: number;
	shortBreak: number;
	longBreak: number;
	sessionsBeforeLongBreak: number;
};

const PRESETS: Record<string, PresetConfig> = {
	Classic: {
		work: 25 * 60,
		shortBreak: 5 * 60,
		longBreak: 15 * 60,
		sessionsBeforeLongBreak: 4,
	},
	"Deep Work": {
		work: 50 * 60,
		shortBreak: 10 * 60,
		longBreak: 30 * 60,
		sessionsBeforeLongBreak: 4,
	},
	"Short Burst": {
		work: 15 * 60,
		shortBreak: 3 * 60,
		longBreak: 10 * 60,
		sessionsBeforeLongBreak: 4,
	},
};

export default function PomodoroTimer() {
	const [mode, setMode] = useState<"Work" | "Short Break" | "Long Break">(
		"Work",
	);
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [workSessions, setWorkSessions] = useState<number>(0);
	const [preset, setPreset] = useState<string>("Classic");
	const [customConfig, setCustomConfig] = useState({
		work: 25,
		shortBreak: 5,
		longBreak: 15,
		sessionsBeforeLongBreak: 4,
	});
	const [showCustomConfig, setShowCustomConfig] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	// Initialize timer with current config
	useEffect(() => {
		const config = PRESETS[preset];
		setTimeLeft(config.work);
	}, [preset]);

	// Handle timer countdown
	useEffect(() => {
		if (isRunning && timeLeft > 0) {
			timerRef.current = setTimeout(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
		} else if (isRunning && timeLeft === 0) {
			handleTimerCompletion();
		}

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [isRunning, timeLeft]);

	// Handle timer completion
	const handleTimerCompletion = () => {
		setIsRunning(false);
		if (timerRef.current) clearTimeout(timerRef.current);

		const config = PRESETS[preset];

		if (mode === "Work") {
			const newSessionCount = workSessions + 1;
			setWorkSessions(newSessionCount);

			if (newSessionCount % config.sessionsBeforeLongBreak === 0) {
				setMode("Long Break");
				setTimeLeft(config.longBreak);
			} else {
				setMode("Short Break");
				setTimeLeft(config.shortBreak);
			}
		} else {
			setMode("Work");
			setTimeLeft(config.work);
		}
	};

	// Start or pause timer
	const toggleTimer = () => {
		setIsRunning(!isRunning);
	};

	// Reset timer
	const resetTimer = () => {
		setIsRunning(false);
		if (timerRef.current) clearTimeout(timerRef.current);

		const config = PRESETS[preset];
		switch (mode) {
			case "Work":
				setTimeLeft(config.work);
				break;
			case "Short Break":
				setTimeLeft(config.shortBreak);
				break;
			case "Long Break":
				setTimeLeft(config.longBreak);
				break;
		}
	};

	// Format seconds to MM:SS
	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	// Apply custom configuration
	const applyCustomConfig = () => {
		PRESETS.Custom = {
			work: customConfig.work * 60,
			shortBreak: customConfig.shortBreak * 60,
			longBreak: customConfig.longBreak * 60,
			sessionsBeforeLongBreak: customConfig.sessionsBeforeLongBreak,
		};
		setPreset("Custom");
		setShowCustomConfig(false);
		setMode("Work");
		setTimeLeft(customConfig.work * 60);
		setWorkSessions(0);
		setIsRunning(false);
		if (timerRef.current) clearTimeout(timerRef.current);
	};

	return (
		<Card className="w-120 p-10">
			<CardHeader>
				<CardTitle className="text-center">
					{mode} Timer ({preset})
				</CardTitle>
				<CardDescription className="text-center">
					{workSessions} work sessions completed
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center">
				<p className="text-6xl font-mono mb-6">{formatTime(timeLeft)}</p>
				<div className="flex flex-col items-center">
					<CardAction className="flex gap-4">
						<Button
							onClick={toggleTimer}
							className="w-24"
							variant={isRunning ? "outline" : "default"}
						>
							{isRunning ? "Pause" : "Start"}
						</Button>
						<Button onClick={resetTimer} className="w-24" variant="secondary">
							Reset
						</Button>
					</CardAction>
					<div className="mt-4 text-sm text-muted-foreground">
						{isRunning ? "Timer is running..." : "Timer paused"}
					</div>
				</div>

				{/* Session Configuration */}
				<div className="mt-8 w-full">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold">Session Configuration</h3>
						<Button
							size="sm"
							variant="outline"
							onClick={() => setShowCustomConfig(!showCustomConfig)}
						>
							{showCustomConfig ? "Hide Custom" : "Custom Setup"}
						</Button>
					</div>

					{/* Preset Selector */}
					<div className="grid grid-cols-3 gap-2 mb-4">
						{Object.keys(PRESETS).map((key) => (
							<Button
								key={key}
								variant={preset === key ? "default" : "outline"}
								onClick={() => setPreset(key)}
								className="text-xs"
							>
								{key}
							</Button>
						))}
					</div>

					{/* Custom Configuration */}
					{showCustomConfig && (
						<div className="bg-muted p-4 rounded-lg">
							<h4 className="font-medium mb-3">Custom Durations (minutes)</h4>
							<div className="grid grid-cols-2 gap-3">
								<div>
									<label
										htmlFor="work-duration"
										className="text-sm text-muted-foreground"
									>
										Work
									</label>
									<input
										id="work-duration"
										type="number"
										min="1"
										value={customConfig.work}
										onChange={(e) =>
											setCustomConfig({
												...customConfig,
												work: Number.parseInt(e.target.value) || 25,
											})
										}
										className="w-full p-2 border rounded"
									/>
								</div>
								<div>
									<label
										htmlFor="short-break"
										className="text-sm text-muted-foreground"
									>
										Short Break
									</label>
									<input
										id="short-break"
										type="number"
										min="1"
										value={customConfig.shortBreak}
										onChange={(e) =>
											setCustomConfig({
												...customConfig,
												shortBreak: Number.parseInt(e.target.value) || 5,
											})
										}
										className="w-full p-2 border rounded"
									/>
								</div>
								<div>
									<label
										htmlFor="long-break"
										className="text-sm text-muted-foreground"
									>
										Long Break
									</label>
									<input
										id="long-break"
										type="number"
										min="1"
										value={customConfig.longBreak}
										onChange={(e) =>
											setCustomConfig({
												...customConfig,
												longBreak: Number.parseInt(e.target.value) || 15,
											})
										}
										className="w-full p-2 border rounded"
									/>
								</div>
								<div>
									<label
										htmlFor="sessions-before-long"
										className="text-sm text-muted-foreground"
									>
										Sessions before long break
									</label>
									<input
										id="sessions-before-long"
										type="number"
										min="1"
										value={customConfig.sessionsBeforeLongBreak}
										onChange={(e) =>
											setCustomConfig({
												...customConfig,
												sessionsBeforeLongBreak:
													Number.parseInt(e.target.value) || 4,
											})
										}
										className="w-full p-2 border rounded"
									/>
								</div>
							</div>
							<Button className="w-full mt-3" onClick={applyCustomConfig}>
								Apply Custom Settings
							</Button>
						</div>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex justify-center mt-4">
				<div className="text-sm">
					Next:{" "}
					{mode === "Work"
						? (workSessions + 1) % PRESETS[preset].sessionsBeforeLongBreak === 0
							? "Long Break"
							: "Short Break"
						: "Work"}
				</div>
			</CardFooter>
		</Card>
	);
}
