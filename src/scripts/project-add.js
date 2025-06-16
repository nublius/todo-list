export const ProjectAdder = (function() {
	const button = document.querySelector(".projects__add");

	const modal = document.querySelector(".project__modal");

	button.addEventListener("click", (event) => {
		modal.showModal();
	})
})();
