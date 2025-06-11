import { Project } from "./project.js";

export const ProjectManager = (function() {
	const projectArray = [];

	const addProject = (title, description, dueDate, priority) => {
		const project = new Project(title, description, dueDate, priority);
		projectArray.push(project);
	}

	const removeProject = (project) => {
		if (!project instanceof Project) {
			return;
		}

		projectArray.pop(project);
	}

	const showProjects = () => {
		console.log(projectArray);
	}

	return {
		addProject,
		removeProject,
		showProjects
	}
})();
