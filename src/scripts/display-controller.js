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
			taskContainer.id = task.title;
			tasksContainer.appendChild(taskContainer);

			const titleContainer = document.createElement("div");
			titleContainer.classList = "task__title__container";

			const titleDom = document.createElement("p");
			titleDom.classList = "task__title";
			titleDom.innerText = task.title;

			const dueDateDom = document.createElement("div");
			dueDateDom.innerText = `Due: ${task.dueDate}`;

			const descDom = document.createElement("p");
			descDom.classList = "task__info";
			descDom.innerText = task.description;

			const settingsContainer = document.createElement("div");
			settingsContainer.classList = "settings__container";

			const settingsTaskButton = document.createElement("button");
			settingsTaskButton.innerHTML = `<svg class="icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cog</title><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>`;

			const deleteTaskButton = document.createElement("button");
			deleteTaskButton.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`;

			deleteTaskButton.addEventListener("click", () => {
				removeTask(task.title);
			})

			titleContainer.appendChild(titleDom);
			titleContainer.appendChild(dueDateDom);
			taskContainer.appendChild(titleContainer);
			taskContainer.appendChild(descDom);
			settingsContainer.appendChild(settingsTaskButton);
			settingsContainer.appendChild(deleteTaskButton);
			taskContainer.appendChild(settingsContainer);
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

	const removeTask = (targetTaskTitle) => {
		let removeTarget = document.getElementById(`${targetTaskTitle}`);
		removeTarget.remove();

		const removeItemTarget = currentProject.findToDo(targetTaskTitle);

		currentProject.removeToDo(removeItemTarget);

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
