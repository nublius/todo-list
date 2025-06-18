export const TaskAdder = (function() {
	const addButton = document.querySelector(".add__task");

	const modal = document.querySelector(".task__modal");

	addButton.addEventListener("click", (event) => {
		modal.showModal();
	})

	const exitButton = document.querySelector(".task__exit");

	exitButton.addEventListener("click", (event) => {
		modal.close();
		document.querySelector("#task__form").reset();
	})

	return { modal };
})();
