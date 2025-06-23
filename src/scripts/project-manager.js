import { Project } from "./project.js";

import { Item } from "./todo-item.js";

export const ProjectManager = (function() {
	let projectArray = [];

	const checkDuplicateTitle = (title) => {
		return projectArray.some(project => project.title === title);
	}

	const addProject = (title, description) => {
		if (checkDuplicateTitle(title)) {
			console.warn("Title is already used.");
			return;
		}

		const project = new Project(title, description);
		projectArray.push(project);

		saveToStorage();
	}

	const removeProject = (title) => {
		const targetProject = findProject(title);

		const index = projectArray.indexOf(targetProject);
		if (index !== -1) {
			targetProject.clearAllToDos();

			projectArray.splice(index, 1);
		}

		saveToStorage();
	}

	const getProjectArray = () => {
		return projectArray;
	}

	const findProject = (title) => {
		const targetProject = projectArray.find(project => project.title === title);

		if (!(targetProject instanceof Project)) {
			return;
		}

		return targetProject;
	}

	const saveToStorage = () => {
		localStorage.setItem("allProjects", JSON.stringify(projectArray));
		console.log("saved");
	};

	const loadFromStorage = () => {
		const raw = localStorage.getItem("allProjects");
		if (!raw) return;

		const parsed = JSON.parse(raw);
		projectArray = parsed.map(data => {
			const project = new Project(data.title, data.description);
			data.toDos.forEach(todo => {
				const item = new Item(todo.title, todo.description, todo.dueDate, todo.priority);
				item.id = todo.id;
				item.done = todo.done;
				project.toDos.push(item);
			});
			return project;
		});
	};

	return {
		addProject,
		removeProject,
		getProjectArray,
		findProject,
		loadFromStorage,
		saveToStorage,
	}
})();
