import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};
		getTasks();
	}, []);
	// Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch("http://localhost:5000/tasks");
		const data = await res.json();
		return data;
	};
	// Fetch Task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();
		return data;
	};
	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "DELETE",
		});
		setTasks(tasks.filter((task) => task.id !== id));
	};
	// Toggle reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updTask),
		});
		const data = await res.json();
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			)
		);
	};
	// Add Task
	const addTask = async (task) => {
		const res = await fetch(`http://localhost:5000/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(task),
		});
		const data = await res.json();
		setTasks([...tasks, data]);

		// const newId = tasks[tasks.length - 1].id + 1;
		// const newTask = {
		// 	id: newId,
		// 	text: task.text,
		// 	day: task.day,
		// 	reminder: task.reminder,
		// };
		// setTasks([...tasks, newTask]);
	};
	return (
		<Router>
			<div className="container">
				<Header
					title="Task Tracker"
					onShowAddTask={() => setShowAddTask(!showAddTask)}
					showAddTask={showAddTask}
				/>
				<Routes>
					<Route
						path="/"
						element={
							<>
								{showAddTask && <AddTask onAdd={addTask} />}
								{tasks.length > 0 ? (
									<Tasks
										tasks={tasks}
										onDelete={deleteTask}
										onToggle={toggleReminder}
									/>
								) : (
									"No tasks to do"
								)}
								<Footer isHomePage />
							</>
						}
					/>
					<Route
						path="/about"
						element={
							<>
								<About />
								<Footer />
							</>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}
export default App;
