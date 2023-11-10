let svgLine = 'http://www.w3.org/2000/svg';
let cursorLine = document.querySelector('.cursor-line');
let ease = 0.60;

let pointer = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2
};

window.addEventListener('mousemove', (event) => {
	pointer.x = event.clientX;
	pointer.y = event.clientY;
});

let leader = (prop) => {
	return prop === "x" ? pointer.x : pointer.y;
}

let total = 100;
for (let i = 0; i < total; i++) {
	leader = createLine(leader, i);
}

function createLine(leader, i) {

	let line = document.createElementNS(svgLine, 'line');
	cursorLine.appendChild(line);

	gsap.set(line, { x: -15, y: -15, opacity: (total - i) / total });

	let pos = gsap.getProperty(line);

	gsap.to(line, {
		duration: 1000,
		x: "+=1",
		y: "+=1",
		repeat: -1,
		ease: "none",
		modifiers: {
			x: () => {
				let posX = pos("x");
				let leaderX = leader("x");
				let x = posX + (leaderX - posX) * ease;
				line.setAttribute("x2", leaderX - x);
				return x;
			},
			y: () => {
				let posY = pos("y");
				let leaderY = leader("y");
				let y = posY + (leaderY - posY) * ease;
				line.setAttribute("y2", leaderY - y);
				return y;
			}
		}
	});

	return pos;
}

let cursorBox = document.querySelector('.cursor-box');
let cursorPointer = document.querySelector('.cursor-pointer');
let cursorHover = document.querySelectorAll('.cursor-hover');
let mouseX = 0;
let mouseY = 0;

gsap.to({}, 0.020, {
	repeat: -2,
	onRepeat: function () {
		gsap.set(cursorPointer, {
			css: {
				top: mouseY,
				left: mouseX,
			}
		})
	}
});

window.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
})

cursorHover.forEach(scale => {
	scale.addEventListener('mousemove', () => {
		cursorBox.classList.add('hover');
	});
	scale.addEventListener('mouseleave', () => {
		cursorBox.classList.remove('hover');
	});
})