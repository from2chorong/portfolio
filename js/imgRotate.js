let images = document.querySelectorAll(".img-box");
let imageList = [];

images.forEach(function (image) {
	let data = {
		localX: 0,
		localY: 0,
		x: 0,
		y: 0,
		friction: 1 / 20,
	};

	imageList.push(data);

	image.addEventListener('mousemove', function (e) {
		let mouseX = Math.max(
			-100,
			Math.min(100, window.innerWidth / 2 - e.clientX)
		);
		let mouseY = Math.max(
			-100,
			Math.min(100, window.innerHeight / 2 - e.clientY)
		);

		data.localX = (10 * mouseX) / 100;
		data.localY = (10 * mouseY) / 100;
	});

	image.addEventListener('mouseleave', function () {
		data.localX = 0;
		data.localY = 0;
	});
});
function imageMove() {
	images.forEach(function (image, index) {
		let data = imageList[index];

		data.x += (data.localX - data.x) * data.friction;
		data.y += (data.localY - data.y) * data.friction;

		image.style.transform = `rotateY(${-data.x}deg) rotateX(${data.y}deg)`;
	});

	window.requestAnimationFrame(imageMove);
}

imageMove();
