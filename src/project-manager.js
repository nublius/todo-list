import { Project } from "./project.js";

export const ProjectManager = (function() {
	const projectArray = [];

	const checkDuplicateTitle = (title) => {
		return projectArray.some(project => project.title === title);
	}

	const addProject = (title) => {
		if (checkDuplicateTitle(title)) {
			console.warn("Title is already used.");
			return;
		}

		const project = new Project(title);
		projectArray.push(project);
	}

	const removeProject = (projectTitle) => {
		const targetProject = projectArray.find(project => project.title === projectTitle);

		if (!(targetProject instanceof Project)) {
			return;
		}

		const index = projectArray.indexOf(targetProject);
		if (index !== -1) {
			projectArray.splice(index, 1);
			targetProject = null;
		}
	}

	const getProjects = () => {
		return projectArray;
	}

	return {
		addProject,
		removeProject,
		getProjects
	}
})();
