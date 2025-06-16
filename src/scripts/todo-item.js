export class Item {
	constructor(title = "Untitled", description = "", dueDate = null, priority = null) {
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
