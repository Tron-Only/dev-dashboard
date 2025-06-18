"use client";

import { useState, useEffect, use } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tag, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Snippet {
	id: string;
	code: string;
	tags: string[];
	createdAt: Date;
}

const DEFAULT_TAGS = ["React", "UI", "Debug", "API", "TypeScript"];

export default function SnippetsBox() {
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const [codeInput, setCodeInput] = useState("");
	const [tagInput, setTageInput] = useState("");
	const [currentTags, setCurrentTags] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Load from localstorage
	useEffect(() => {
		const saved = localStorage.getItem("snippets");
		setSnippets(saved ? JSON.parse(saved) : []);
		setIsLoading(false);
	}, []);

	// Save to localstorage
	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem("snippets", JSON.stringify(snippets));
		}
	}, [snippets, isLoading]);

	const handleSave = () => {
		if (!codeInput.trim()) return;

		const newSnippet: Snippet = {
			id: uuidv4(),
			code: codeInput,
			tags: currentTags,
			createdAt: new Date(),
		};

		setSnippets([...snippets, newSnippet]);
		setCodeInput("");
		setCurrentTags([]);
	};

	const handleAddTag = () => {
		if (tagInput.trim() && !currentTags.includes(tagInput)) {
			setCurrentTags([...currentTags, tagInput]);
			setTageInput("");
		}
	};

	const handleRemoveTag = (tag: string) => {
		setCurrentTags(currentTags.filter((t) => t !== tag));
	};

	const handleDeleteSnippet = (id: string) => {
		setSnippets(snippets.filter((s) => s.id !== id));
	};

	return (
		<Card className="w-full p-6">
			<h2 className="text-xl font-semibold mb-4">Code Snippets</h2>

			<textarea
				value={codeInput}
				onChange={(e) => setCodeInput(e.target.value)}
				placeholder="Paste your code here..."
				className="w-full min-h-[150px] font-mono p-3 border rounded mb-4"
			/>

			<div className="flex gap-2 mb-4">
				<input
					value={tagInput}
					onChange={(e) => setTageInput(e.target.value)}
					className="flex-1 border rounded p-2"
					placeholder="Add tags..."
					list="tagSuggestions"
				/>
				<datalist id="tagSuggestions">
					{DEFAULT_TAGS.map((tag) => (
						<option key={tag} value={tag} />
					))}
				</datalist>
				<Button onClick={handleAddTag}>Add Tag</Button>
			</div>
			<div className="flex flex-wrap gap-2 mb-4">
				{currentTags.map((tag) => (
					<span
						key={tag}
						className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm "
					>
						<Tag className="w-4 h-4 mr-1" />
						{tag}
						<X
							className="w-4 h-4 ml-1 cursor-pointer"
							onClick={() => handleRemoveTag(tag)}
						/>
					</span>
				))}
			</div>

			<Button onClick={handleSave} className="w-full mb-4">
				Save Snippet
			</Button>

			<div className="mt-6">
				<h3 className="font-medium mb-2">Saved Snippets</h3>
				{snippets.map((snippet) => (
					<Card key={snippet.id} className="p-4 mb-4 relative">
						<div className="absolute top-2 right-2">
							<X
								className="w-5 h-5 text-red-500 cursor-pointer"
								onClick={() => handleDeleteSnippet(snippet.id)}
							/>
						</div>

						<pre className="bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto">
							{snippet.code}
						</pre>

						<div>
							{snippet.tags.map((tag) => (
								<span
									key={tag}
									className="text-xs bg-blue-100 px-2 py-1 rounded"
								>
									{tag}
								</span>
							))}
						</div>
						<div className="text-xs text-gray-500 mt-2">
							{new Date(snippet.createdAt).toLocaleDateString()}
						</div>
					</Card>
				))}
			</div>
		</Card>
	);
}
