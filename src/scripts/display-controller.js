import { ProjectManager } from "./project-manager.js";

import { ProjectAdder } from "./project-add.js";

ProjectManager.addProject("Tasks");
ProjectManager.addProject("Project 1");

ProjectManager.findProject("Tasks").addToDo("Yep", "Description here", "01/01/2002", "1");

export const Controller = (function() {
	const initDisplay = () => {
		const projectsContainer = document.querySelector(".projects__list");

		const projectForm = document.querySelector("#project__form");

		const tasksContainer = document.querySelector(".tasks__container");

		return { projectsContainer, tasksContainer, projectForm };
	}

	const loadProjects = () => {
		const projects = ProjectManager.getProjectArray();

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

	const loadProjectTasks = (projectTitle) => {
		const targetProject = ProjectManager.findProject(projectTitle);

		const tasksArray = targetProject.getToDos();
		const length = tasksArray.length;

		for (let i = 0; i < length; i++) {
			const taskContainer = document.createElement("div");
			taskContainer.classList = "task";
			initDisplay().tasksContainer.appendChild(taskContainer);

			const taskTitle = tasksArray[i].title;
			const titleDom = document.createElement("p");
			titleDom.classList = "task__title";
			titleDom.innerText = taskTitle;
			taskContainer.appendChild(titleDom);

			const taskDescription = tasksArray[i].description;
			const descDom = document.createElement("p");
			descDom.classList = "task__info";
			descDom.innerText = taskDescription;
			taskContainer.appendChild(descDom);

		}
	}

	const addProject = () => {
		form = initDisplay().projectForm;
	}

	const clearTasksContainer = () => {
		initDisplay().tasksContainer.innerHTML = "";
	}

	loadProjects();
	loadProjectTasks("Tasks");

})();
