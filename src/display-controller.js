import { ProjectManager } from "./project-manager.js";

ProjectManager.addProject("Tasks");
ProjectManager.addProject("Project 1");

export const Controller = (function() {
	const initDisplay = () => {
		const projectsContainer = document.querySelector(".projects__list");

		const tasksContainer = document.querySelector(".tasks__container");

		return { projectsContainer, tasksContainer };
	}

	const loadProjects = () => {
		const projects = ProjectManager.getProjects();

		const length = projects.length;

		for (let i = 0; i < length; i++) {
			const projectTitle = projects[i].title;
			const titleDom = document.createElement("li");

			const projectButton = document.createElement("button");
			projectButton.classList = "project__button";
			projectButton.textContent = projectTitle;

			titleDom.appendChild(projectButton);

			initDisplay().projectsContainer.appendChild(titleDom);
		}
	}

	loadProjects();
})();
