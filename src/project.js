import { Item } from "./todo-item.js";

export class Project {
	constructor(title = "Untitled", description = "", dueDate = null) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
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
			item = null;
		}
	}

	getToDos() {
		return this.toDos;
	}
}
