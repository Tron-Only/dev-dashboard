# 🚀 Dev Dashboard

A comprehensive developer dashboard built with Next.js, designed to enhance productivity and streamline daily development workflows. This application integrates essential tools like a Pomodoro timer, a code snippets manager, and a to-do list, all within a clean and intuitive interface.

## ✨ Features

*   **Pomodoro Timer**: Boost your focus with a customizable Pomodoro timer to manage work and break intervals.
*   **Code Snippets Manager**: Store, organize, and quickly retrieve your frequently used code snippets.
*   **To-Do List**: Keep track of your tasks and manage your daily development agenda efficiently.
*   **Dark/Light Mode Toggle**: Seamlessly switch between dark and light themes for a comfortable viewing experience.
*   **Responsive Design**: Optimized for various screen sizes, ensuring a consistent experience across devices.

## 🛠️ Getting Started

Follow these steps to get your development environment set up and run the Dev Dashboard locally.

### Prerequisites

Ensure you have the following installed on your machine:

*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) or [Bun](https://bun.sh/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone hhttps://github.com/Tron-Only/dev-dashboard.git
    cd dev-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Running the Development Server

To start the application in development mode:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you make changes to the source files.

## 🚀 Usage

Once the application is running, you can access its features through the dashboard interface.

*   **Pomodoro Timer**: Navigate to the Pomodoro section to start, pause, or reset your work and break sessions.
*   **Code Snippets**: Use the Snippets section to add new code snippets, search existing ones, and copy them to your clipboard.
*   **To-Do List**: Manage your tasks by adding new items, marking them as complete, or deleting them from the list.
*   **Theme Toggle**: Use the moon/sun icon (usually in the top right corner) to switch between dark and light modes.

## 🤝 Contributing

We welcome contributions to the Dev Dashboard! If you'd like to contribute, please follow these guidelines.

### How to Contribute

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and ensure they adhere to the project's coding standards.
4.  Write clear, concise commit messages.
5.  Push your branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request to the `main` branch of the original repository.

### Development Setup

*   Ensure your code is formatted using Prettier (I personally use BiomeJS).


## 🐛 Troubleshooting

### Common Issues

*   **`Error: listen EADDRINUSE: address already in use :::3000`**: This means another process is already using port 3000. You can either stop the other process or configure Next.js to run on a different port (e.g., `PORT=3001 npm run dev`).
*   **Dependencies not installing**: Ensure your Node.js and npm/yarn/pnpm/bun versions are up to date. Try clearing your package manager cache (`npm cache clean --force`).

### Reporting Bugs

If you find a bug, please open an issue on the [GitHub Issues page](https://github.com/Tron-Only/dev-dashboard.git/issues) and provide as much detail as possible, including:

*   Steps to reproduce the bug.
*   Expected behavior.
*   Actual behavior.
*   Screenshots (if applicable).
*   Your operating system and browser version.

## ❓ FAQ

**Q: What technologies are used in this project?**
A: This project is built with Next.js, React, and TypeScript, utilizing Tailwind CSS for styling and Shadcn UI components.

**Q: Can I customize the Pomodoro timer intervals?**
A: Currently, the timer intervals are fixed, but this is a planned feature for future updates.

**Q: How do I add new features?**
A: Please refer to the [Contributing](#-contributing) section for guidelines on how to propose and implement new features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
*(Note: You may need to create a `LICENSE.md` file if one doesn't exist.)*

## 🙏 Acknowledgements

*   [Next.js](https://nextjs.org/) - The React framework for production.
*   [Shadcn UI](https://ui.shadcn.com/) - For beautiful and accessible UI components.
*   [Tailwind CSS](https://tailwindcss.com/) - For utility-first CSS framework.
