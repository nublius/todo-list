import { Item } from "./todo-item.js";

export class Project {
	constructor(title = "Untitled") {
		this.title = title;
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

	clearAllToDos() {
		const toDoArray = this.toDos;
		for (let i = 0; i < toDoArray.length, i++;) {
			toDoArray[i] = null;
		}
	}
}
