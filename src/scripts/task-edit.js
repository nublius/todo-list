export const TaskEditor = {
	init() {
		const editButtons = document.querySelectorAll(".task__edit__button");
		const exitButtons = document.querySelectorAll(".task__edit__exit");
		const modal = document.querySelector(".task__edit__modal");

		for (const button of editButtons) {
			button.addEventListener("click", () => {
				modal.showModal();
			});
		}

		for (const button of exitButtons) {
			button.addEventListener("click", () => {
				modal.close();
				document.querySelector("#task__edit__form").reset();
			});
		}
	}
};
