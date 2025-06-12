export class Item {
	constructor(title, description, dueDate, priority) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.done = false;
	}

	getProperties() {
		console.table(this);
	}
}
