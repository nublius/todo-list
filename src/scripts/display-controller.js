import { ProjectManager } from "./project-manager.js";

import { ProjectAdder } from "./project-add.js";

ProjectManager.addProject("To Dos", "description wowowwwwow");
ProjectManager.addProject("Project 1", "lorem ipsum decliaieafnkewaf");

ProjectManager.findProject("To Dos").addToDo("Yep", "Description here", "01/01/2002", "1");

ProjectManager.findProject("Project 1").addToDo("True", "YEPERS", "01/01/2002", "2");

export const Controller = (function() {
	let projectsContainer, tasksContainer, projectForm;

	const initDisplay = () => {
		projectsContainer = document.querySelector(".projects__list");
		tasksContainer = document.querySelector(".tasks__container");
		projectForm = document.querySelector("#project__form");
	};

	const loadProjects = () => {
		projectsContainer.innerHTML = "";

		const projects = ProjectManager.getProjectArray();
		for (let project of projects) {
			const titleDom = document.createElement("li");

			const projectButton = document.createElement("button");
			projectButton.classList = "project__button";
			projectButton.textContent = project.title;

			projectButton.addEventListener("click", () => {
				clearTasksContainer();
				loadProjectTasks(project.title);
			});

			titleDom.appendChild(projectButton);
			projectsContainer.appendChild(titleDom);
		}
	};

	const loadProjectTasks = (projectTitle) => {
		const targetProject = ProjectManager.findProject(projectTitle);
		const tasksArray = targetProject.getToDos();

		const projectHeader = document.querySelector(".project__header");
		projectHeader.textContent = targetProject.title;

		const projectDesc = document.querySelector(".project__desc");
		projectDesc.textContent = targetProject.description;

		for (let task of tasksArray) {
			const taskContainer = document.createElement("div");
			taskContainer.classList = "task";
			tasksContainer.appendChild(taskContainer);

			const titleDom = document.createElement("p");
			titleDom.classList = "task__title";
			titleDom.innerText = task.title;

			const descDom = document.createElement("p");
			descDom.classList = "task__info";
			descDom.innerText = task.description;

			taskContainer.appendChild(titleDom);
			taskContainer.appendChild(descDom);
		}
	};

	const addProject = () => {
		projectForm.addEventListener("submit", (event) => {
			event.preventDefault();
			formHandler();
			ProjectAdder.modal.close();
			loadProjects();
			projectForm.reset();
		});
	};

	const formHandler = () => {
		const title = projectForm.title.value;
		const description = projectForm.description.value;

		ProjectManager.addProject(title, description);
	};

	const clearTasksContainer = () => {
		tasksContainer.innerHTML = "";
	};

	const init = () => {
		initDisplay();
		loadProjects();
		loadProjectTasks("To Dos");
		addProject();
	};

	return { init };

})();
