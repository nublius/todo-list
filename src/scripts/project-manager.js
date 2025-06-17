import { Project } from "./project.js";

export const ProjectManager = (function() {
	const projectArray = [];

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
	}

	const removeProject = (title) => {
		const targetProject = findProject(title);

		const index = projectArray.indexOf(targetProject);
		if (index !== -1) {
			targetProject.clearAllToDos();

			projectArray.splice(index, 1);
			targetProject = null;
		}
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

	return {
		addProject,
		removeProject,
		getProjectArray,
		findProject
	}
})();
