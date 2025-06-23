import { Item } from "./todo-item.js";

export class Project {
	constructor(title = "Untitled", description = "") {
		this.title = title;
		this.description = description;
		this.toDos = [];
	}

	addToDo(title, description, dueDate, priority) {
		const toDo = new Item(title, description, dueDate, priority);
		this.toDos.push(toDo);
	}

	removeToDo(item) {
		if (!(item instanceof Item)) {
			return;
		}

		const index = this.toDos.indexOf(item);

		if (index !== -1) {
			this.toDos.splice(index, 1);
		}
	}

	getToDos() {
		return this.toDos;
	}

	findToDo(itemId) {
		const targetItem = this.toDos.find(item => item.id === itemId);

		if (!(targetItem instanceof Item)) {
			return;
		}

		return targetItem;
	}

	editToDo(id, title, description, dueDate) {
		const targetItem = this.findToDo(id);
		if (!targetItem) return;
		const targetIndex = this.toDos.indexOf(targetItem);

		this.toDos[targetIndex].title = title;
		this.toDos[targetIndex].description = description;
		this.toDos[targetIndex].dueDate = dueDate;
	}

	clearAllToDos() {
		const toDoArray = this.toDos;
		this.toDos = [];
	}
};
