export default class Timer {
	constructor(root) {
		root.innerHTML = Timer.getHTML();

		this.el = {
			minutes: root.querySelector(".minutes"),
			seconds: root.querySelector(".seconds"),
			control: root.querySelector(".control"),
			reset: root.querySelector(".reset"),
		};

		this.interval = null;
		this.remainingSeconds = 0;

		this.el.control.addEventListener("click", () => {
			if (this.interval === null) {
				this.start();
			} else {
				this.stop();
			}
		});

		this.el.reset.addEventListener("click", () => {
			let inputMinutes = prompt("Enter number of minutes: ");

			if (inputMinutes < 60) {
				this.stop();
				this.remainingSeconds = inputMinutes * 60;
				this.updateInterfaceTime();
			}
		});
	}

	updateInterfaceTime() {
		let minutes = Math.floor(this.remainingSeconds / 60);
		let seconds = this.remainingSeconds % 60;
		this.el.minutes.textContent = minutes.toString().padStart(2, "0");
		this.el.seconds.textContent = seconds.toString().padStart(2, "0");
	}

	updateInterfaceControls() {
		if (this.interval === null) {
			this.el.control.innerHTML = `<span class="material-symbols-rounded"> play_arrow </span>`;
			this.el.control.classList.add("start");
			this.el.control.classList.remove("stop");
		} else {
			this.el.control.innerHTML = `<span class="material-symbols-rounded"> pause </span>`;

			this.el.control.classList.add("stop");
			this.el.control.classList.remove("start");
		}
	}

	start() {
		if (this.remainingSeconds === 0) return;

		this.interval = setInterval(() => {
			this.remainingSeconds--;
			this.updateInterfaceTime();

			if (this.remainingSeconds === 0) {
				this.stop();
			}
		}, 1000);

		this.updateInterfaceControls();
	}

	stop() {
		clearInterval(this.interval);

		this.interval = null;

		this.updateInterfaceControls();
	}

	static getHTML() {
		return `
			<span class="minutes">00</span class="seperator"><span>:</span><span class="seconds">00</span>

			<button class="control start">
				<span class="material-symbols-rounded"> play_arrow </span>
			</button><button class="reset">
				<span class="material-symbols-rounded"> timer </span>
			</button>
		`;
	}
}
