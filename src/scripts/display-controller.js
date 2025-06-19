import { ProjectManager } from "./project-manager.js";

import { ProjectAdder } from "./project-add.js";

import { TaskAdder } from "./task-add.js";

ProjectManager.addProject("To Dos", "description wowowwwwow");
ProjectManager.addProject("Project 1", "lorem ipsum decliaieafnkewaf");

ProjectManager.findProject("To Dos").addToDo("Yep", "Description here", "01/01/2002", "1");

ProjectManager.findProject("Project 1").addToDo("True", "YEPERS", "01/01/2002", "2");

export const Controller = (function() {
	let projectsContainer, tasksContainer, projectForm, taskForm, currentProject;

	currentProject = ProjectManager.findProject("To Dos");

	const initDisplay = () => {
		projectsContainer = document.querySelector(".projects__list");
		tasksContainer = document.querySelector(".tasks__container");
		projectForm = document.querySelector("#project__form");
		taskForm = document.querySelector("#task__form");
	};

	const loadProjects = () => {
		projectsContainer.innerHTML = "";

		const projects = ProjectManager.getProjectArray();
		for (let project of projects) {
			const titleDomContainer = document.createElement("div");
			titleDomContainer.classList = "title__dom__container";
			titleDomContainer.id = project.title;

			const deleteProjectButton = document.createElement("button");
			deleteProjectButton.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`;

			const titleDom = document.createElement("li");

			const projectButton = document.createElement("button");
			projectButton.classList = "project__button";
			projectButton.textContent = project.title;

			projectButton.addEventListener("click", () => {
				clearTasksContainer();
				loadProjectTasks(project.title);
				currentProject = project;
			});

			deleteProjectButton.addEventListener("click", () => {
				removeProject(project.title);
			})

			titleDom.appendChild(projectButton);
			titleDomContainer.appendChild(titleDom);
			titleDomContainer.appendChild(deleteProjectButton);
			projectsContainer.appendChild(titleDomContainer);
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
			projectFormHandler();
			ProjectAdder.modal.close();
			loadProjects();
			projectForm.reset();
		});
	};

	const removeProject = (targetProjectTitle) => {
		let removeTarget = document.getElementById(`${targetProjectTitle}`);
		removeTarget.remove();

		ProjectManager.removeProject(targetProjectTitle);

	}

	const addTask = () => {
		taskForm.addEventListener("submit", (event) => {
			event.preventDefault();
			taskFormHandler();
			TaskAdder.modal.close();
			tasksContainer.innerHTML = "";
			loadProjectTasks(currentProject.title);
			taskForm.reset();
		})
	}

	const projectFormHandler = () => {
		const title = projectForm.title.value;
		const description = projectForm.description.value;

		ProjectManager.addProject(title, description);
	};

	const taskFormHandler = () => {
		const title = taskForm.title.value;
		const description = taskForm.description.value;
		const dueDate = taskForm.dueDate.value;

		currentProject.addToDo(title, description, dueDate, "1");
	}

	const clearTasksContainer = () => {
		tasksContainer.innerHTML = "";
	};

	const init = () => {
		initDisplay();
		loadProjects();
		loadProjectTasks("To Dos");
		addProject();
		addTask();
	};

	return { init };

})();
