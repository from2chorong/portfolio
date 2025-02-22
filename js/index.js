const $container = document.querySelector('.container');
let wraps = [];

function renderList() {
    const fragment = document.createDocumentFragment();

    lists.forEach(list => {
        const item = document.createElement('div');
        item.classList.add('list');

        const link = document.createElement('a');
        link.href = list.link;
        link.target = '_blank';

        const figure = document.createElement('figure');
        figure.classList.add('img');

        const img = document.createElement('img');
        img.src = `/portfolio/images/projects/${list.image}.jpg`;
        img.alt = list.img;
        img.loading = 'lazy';

        figure.append(img);

        const text = document.createElement('div');
        text.classList.add('text');

        const type = document.createElement('span');
        type.textContent = list.type;

        const name = document.createElement('h6');
        name.textContent = list.name;

        text.append(type, name);

        link.append(figure, text);
        item.append(link);
        fragment.appendChild(item);
    });

    $container.appendChild(fragment);
}
renderList();

function onRenderListComplete() {
    initAnimation();
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function (...args) {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function initAnimation() {
    const $items = gsap.utils.toArray($container.children);

	function setupWraps() {
		wraps = [];
        const containerRect = $container.getBoundingClientRect();

        for (let i = 0; i < $items.length; i++) {
            const itemRect = $items[i].getBoundingClientRect();
            const min = containerRect.top - itemRect.bottom;
            const max = containerRect.bottom - itemRect.bottom;
            const wrap = gsap.utils.wrap(min, max);

            wraps.push(wrap);
        }
    }

    setupWraps();

	Observer.create({
        preventDefault: false,
		target: $container,
		onChange: ({ deltaY, isDragging, event }) => {
			if (event.type === 'wheel') {
				event.preventDefault();
			}

			const d = event.type === 'wheel' ? -deltaY : deltaY;
			const y = isDragging ? d * 5 : d * 10;

			for (let i = 0; i < $items.length; i++) {
				gsap.to($items[i], {
					duration: 1,
					ease: 'power4.out',
					y: `+=${y}`,
					modifiers: {
						y: gsap.utils.unitize(wraps[i]),
					},
				});
			}
		},
    });

		
	window.addEventListener('resize', () => {
		setupWraps();
		resetScrollAnimation();
	});

	function resetScrollAnimation() {
		const $items = gsap.utils.toArray($container.children);
		for (let i = 0; i < $items.length; i++) {
			gsap.set($items[i], {
				clearProps: 'y',
			});
		}
	}

	function imgMove() {
		let isMouseInside = false;
		let isMouseMoving = false;

		const move = throttle(function (e) {
			if (!isMouseInside || !isMouseMoving) return;

			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;

			$items.forEach(function ($item) {
				const rect = $item.getBoundingClientRect();
				const containerCenterX = rect.left + rect.width / 2;
				const containerCenterY = rect.top + rect.height / 2;

				const dxFromCenter = containerCenterX - e.clientX;
				const dyFromCenter = containerCenterY - e.clientY;

				const distanceRatioX = dxFromCenter / centerX;
				const distanceRatioY = dyFromCenter / centerY;

				const rotationX = distanceRatioY * 10;
				const rotationY = distanceRatioX * 10;

				const $text = $item.querySelector('.text');
				if (!$text) return;

				const $h6 = $text.querySelector('h6');
				if (!$h6) return;

				let $shadow = $text.querySelector('.shadow');
				if (!$shadow) {
					$shadow = document.createElement('div');
					$shadow.classList.add('shadow');
					const $h6Clone = $h6.cloneNode(true);
					$shadow.appendChild($h6Clone);
					$text.appendChild($shadow);
				}

				$shadow.style.left = `${-dxFromCenter}px`;
				$shadow.style.top = `${-dyFromCenter}px`;

				gsap.to($item, {
					duration: 0.5,
					rotateX: rotationX,
					rotateY: -rotationY,
					ease: 'power4.out',
				});

				gsap.to($text, {
					duration: 0.5,
					rotateX: -(rotationX * 2),
					rotateY: (rotationY * 2),
					ease: 'power4.out',
				});
			});
		}, 50);

		const leave = function () {
			$items.forEach(function ($item) {
				const $text = $item.querySelector('.text');
				gsap.to($item, {
					duration: 0.5,
					rotateX: 0,
					rotateY: 0,
					ease: 'power4.out',
				});

				gsap.to($text, {
					duration: 0.5,
					rotateX: 0,
					rotateY: 0,
					ease: 'power4.out',
				});
			});
		};

		const enterHandler = function () {
			isMouseInside = true;
			isMouseMoving = true;
			$container.addEventListener('mousemove', move);
		};

		const leaveHandler = function () {
			isMouseInside = false;
			isMouseMoving = false;
			$container.removeEventListener('mousemove', move);
			leave();
		};

		$container.addEventListener('mouseenter', enterHandler);
		$container.addEventListener('mouseleave', leaveHandler);

	}
	if (window.innerWidth > 768) {
		imgMove();
	}
}

window.addEventListener('DOMContentLoaded', () => {
    onRenderListComplete();
});

function handleShadow($text, action) {
    const $shadow = $text.querySelector('.shadow');
    if ($shadow) {
        if (action === 'add') {
            $shadow.classList.add('circle');
        } else if (action === 'remove') {
            $shadow.classList.remove('circle');
        }
    }
}

const $texts = document.querySelectorAll('.text');

$texts.forEach($text => {
    $text.addEventListener('mouseover', function () {
		handleShadow($text, 'add');
    });

    $text.addEventListener('mouseleave', function() {
		handleShadow($text, 'remove');
    });
});

function toLeft() {
	var rolling = document.querySelector('.rolling .inner');
	var pElements = rolling.querySelectorAll('p');
    var leftW = pElements[0].offsetWidth || 100;

    setInterval(function () {
        rolling.style.transition = 'transform 20s linear';
        rolling.style.transform = `translateX(-${leftW}px)`;

        setTimeout(function () {
            rolling.style.transition = 'none';
            rolling.style.transform = 'translateX(0)';
            rolling.appendChild(pElements[0]);
            pElements = rolling.querySelectorAll('p');
        }, 20000);
    }, 10);
}

document.addEventListener('DOMContentLoaded', function () {
    toLeft();
});
