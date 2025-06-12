import { Item } from "./todo-item.js";

export class Project {
	constructor(title, description, dueDate) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.toDos = [];
	}

	addToDo = (title, description, dueDate, priority) => {
		const toDo = new Item(title, description, dueDate, priority);
		this.toDos.push(toDo);
	}

	removeToDo = (item) => {
		if (!item instanceof Item) {
			return;
		}

		this.toDos.pop(item);
		item = null;
	}

	getToDos = () => {
		return this.toDos;
	}
}
