export const TaskEditor = {
	id: null,
	modal: document.querySelector(".task__edit__modal"),

	init() {
		const editButtons = document.querySelectorAll(".task__edit__button");
		const exitButtons = document.querySelectorAll(".task__edit__exit");

		for (const button of editButtons) {
			button.addEventListener("click", () => {
				this.modal.showModal();
				this.id = button.id;
				console.log(this.id);
			});
		}

		for (const button of exitButtons) {
			button.addEventListener("click", () => {
				this.modal.close();
				this.id = null;
				document.querySelector("#task__edit__form").reset();
			});
		}
	},

	returnId() {
		return this.id;
	},

	getModal() {
		return this.modal;
	},
};
