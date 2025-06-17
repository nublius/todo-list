export const ProjectAdder = (function() {
	const addButton = document.querySelector(".projects__add");

	const modal = document.querySelector(".project__modal");

	addButton.addEventListener("click", (event) => {
		modal.showModal();
	})

	const exitButton = document.querySelector(".project__exit");

	exitButton.addEventListener("click", (event) => {
		modal.close();
	})

	return { modal };
})();
