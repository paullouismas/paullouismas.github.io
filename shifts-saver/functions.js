import Sha256 from "https://cdn.jsdelivr.net/gh/chrisveness/crypto/sha256.js";



const _KEY = "data";
const defaultArchitecture = {
	shifts: [], 
	lastSave: null, 
	currentRate: 0, 
	_deleted: []
};



function queryData(raw = false) {
	return new Promise(resolve => resolve(localStorage.getItem(_KEY)))
		.then(storedData => storedData === null ? defaultArchitecture : !!raw ? storedData : JSON.parse(storedData));
}

function saveData(data = {}, raw = false) {
	return new Promise(resolve => {
		localStorage.setItem(_KEY, !!raw ? data : JSON.stringify(updateIntegrity(data)));

		resolve(data);
	});
}

function listShifts() {
	queryData().then(function(data) {
		const list = document.querySelector("main > div.tab#view > .tab-content > table > tbody");
						
		list.innerHTML = "";

		// Add saved shifts to #view tab
		data.shifts.forEach((shift, index) => {
			const row = document.querySelector("template#_row").content.cloneNode("true").querySelector("tr");

			row.dataset.uid = shift._uid;

			row.querySelector("._start").innerText = new Date(shift.startTime).toLocaleString();

			if (shift.endTime === null) {
				const button = document.createElement("button");

				button.classList.add("complete");

				button.innerText = "End now";

				button.addEventListener("click", function(event) {
					data.shifts[index] = { ...data.shifts[index], endTime: Date.now() };

					saveData(data).then(data => {
						listShifts();

						displayPopup("info", "Successfully finished shift.", 5000);
					});
				});

				row.querySelector("._end").append(button);
			} else
				row.querySelector("._end").innerText = new Date(shift.endTime).toLocaleString();

			row.querySelector("._rate").innerText = `${shift.rate}$`;
			row.querySelector("._description").innerText = shift.description;

			row.querySelector("._actions > button.edit").addEventListener("click", function(event) {
				// Edit a row

				location.hash = "edit";

				const startTimeSource = document.getElementById("_form-edit-startDate");
				const endTimeSource = document.getElementById("_form-edit-endDate");
				const rateSource = document.getElementById("_form-edit-rate");
				const descriptionSource = document.getElementById("_form-edit-description");
				const saveButton = document.querySelector("#edit button.save");

				startTimeSource.value = toNormalDate(shift.startTime);
				endTimeSource.value = toNormalDate(shift.endTime);
				rateSource.value = shift.rate;
				descriptionSource.value = shift.description;

				saveButton.addEventListener("click", function(event) {
					event.preventDefault();

					shift.startTime = startTimeSource.value;
					shift.endTime = endTimeSource.value;
					shift.rate = rateSource.value;
					shift.description = descriptionSource.value;

					data.shifts[index] = shift;

					saveData(data).then(data => {
						listShifts();

						location.hash = "view";

						displayPopup("info", "Shift data updated successfully.", 5000);
					});
				});
			});
			row.querySelector("._actions > button.delete").addEventListener("click", function(event) {
				// Delete a row

				const { startTime, endTime, rate, description } = data.shifts[index];

				displayModal(
					"Delete shift", 
					`Are you sure you wanna delete this shift?\n\nStart date: ${new Date(startTime).toLocaleString()}\nEnd date: ${new Date(endTime).toLocaleString()}\nRate: ${rate}$/hour\nDescription: ${description}`, 
					[
						{ text: "Cancel" }, 
						{
							text: "Delete", 
							handler() {
								const shift = data.shifts.splice(index, 1)[0];

								data._deleted.push({
									deletedAt: Date.now(), 
									shift
								});

								saveData(data).then(data => {
									listShifts();

									displayPopup("info", "Successfully deleted shift.", 5000);
								});
							}, 
							color: "red"
						}
					], 
					"white");
			});

			list.append(row);
		});
	});
}

function displayPopup(popupStyle = "info", popupMessage = "", popupDuration = 5000) {
	const popupHandler = document.getElementById("_popups-handler");

	return new Promise(function(resolve) {
		const popup = document.createElement("div");
		const message = document.createElement("p");

		popup.classList.add("popup");
		popup.classList.add(`popup--${popupStyle}`);

		message.classList.add("popup-message");
		message.innerText = popupMessage;

		popup.append(message);

		popup.style.opacity = "0";

		popupHandler.append(popup);

		setTimeout(() => {
			popup.style.opacity = "1";

			if (popupDuration >= 0)
				setTimeout(() => {
					popup.style.opacity = "0";

					setTimeout(() => popup.remove(), 1000);
				}, popupDuration);

			popup.addEventListener("click", () => {
				resolve(popup);

				popup.style.opacity = "0";

				setTimeout(() => popup.remove(), 1000);
			});
		}, 0);
	});
}

function displayModal(modalHeader = "", modalMessage = "", modalButtons = [], modalColor = "white") {
	const modalHandler = document.getElementById("_modals-handler");

	return new Promise(function(resolve) {
		const modal = document.createElement("div");
		const header = document.createElement("h1");
		const message = document.createElement("p");
		const buttonsContainer = document.createElement("div");

		modal.classList.add("modal");
		modal.style.backgroundColor = modalColor;

		header.classList.add("modal-header");
		header.innerText = modalHeader;

		message.classList.add("modal-message");
		message.innerText = modalMessage;

		buttonsContainer.classList.add("modal-buttons-container");

		modal.append(header, message, buttonsContainer);

		modal.style.opacity = "0";

		modalHandler.append(modal);

		setTimeout(() => {
			modal.style.opacity = "1";

			modalHandler.style.width = "100vw";
			modalHandler.style.height = "100vh";
			modalHandler.style.backgroundColor = "rgba(0, 0, 0, 0.25)";

			modalButtons.forEach(({ text = "", handler = function() {}, color = "grey" }) => {
				const button = document.createElement("button");

				button.classList.add("modal-button");
				button.style.backgroundColor = color;

				button.innerText = text;

				button.addEventListener("click", function(event) {
					try { handler(); } catch (error) { console.error(error); }

					resolve(modal);

					modal.style.opacity = "0";

					modalHandler.style.width = "";
					modalHandler.style.height = "";
					modalHandler.style.backgroundColor = "";

					setTimeout(() => modal.remove(), 1000);
				});

				buttonsContainer.append(button);
			});
		}, 0);
	});
}

function updateIntegrity(data = {}) {
	const {
		_integrity, 
		...sanitizedData
	} = data;

	return {
		...sanitizedData, 
		_integrity: Sha256.hash(JSON.stringify(sanitizedData))
	};
}

function checkIntegrity(data = {}) {
	const {
		_integrity, 
		...rest
	} = data;

	return _integrity === Sha256.hash(JSON.stringify(rest));
}

function toNormalDate(date = new Date()) {
	const n = new Date(date);

	return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, 0)}-${String(n.getDate()).padStart(2, 0)}T${String(n.getHours()).padStart(2, 0)}:${String(n.getMinutes()).padStart(2, 0)}`;
}



export {
	queryData, 
	listShifts, 
	displayPopup, 
	displayModal, 
	saveData, 
	updateIntegrity, 
	toNormalDate
};
