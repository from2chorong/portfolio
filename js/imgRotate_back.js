const multiple = 100;
const mouseOverContainer = document.getElementsByTagName('body')[0];
const elements = document.querySelectorAll('.cont');

function transformElement(element, x, y) {
	let box = element.getBoundingClientRect();
	let calcX = -(y - box.y - box.height / 2) / multiple;
	let calcY = (x - box.x - box.width / 2) / multiple;

	element.style.transform =
		'rotateX(' + calcX + 'deg) ' + 'rotateY(' + calcY + 'deg';
}

function resetTransform(element) {
	element.style.transform = 'rotateX(0) rotateY(0)';
}

elements.forEach((element) => {
	element.addEventListener('mousemove', (e) => {
		window.requestAnimationFrame(function () {
			transformElement(element, e.clientX, e.clientY);
		});
	});

	element.addEventListener('mouseleave', (e) => {
		window.requestAnimationFrame(function () {
			resetTransform(element);
		});
	});
});