const $container = document.querySelector('.container');
const $cursor = document.querySelector('.cursor');
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

    let lastDeltaY = 0;
	let ticking = false;
	const scrollAmount = window.innerHeight / 2;

    Observer.create({
        preventDefault: true,
        target: $container,
        onChange: ({ deltaY, event }) => {
            lastDeltaY = event.type === 'wheel' ? -deltaY : deltaY;
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
					const scrollDistance = Math.sign(lastDeltaY) * scrollAmount;
                    for (let i = 0; i < $items.length; i++) {
                        gsap.to($items[i], {
                            duration: 1,
                            y: `+=${scrollDistance}`,
							ease: 'power4.out',
                            modifiers: {
                                y: gsap.utils.unitize(wraps[i]),
                            },
                        });
                    }
                    ticking = false;
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

				let $shadow = $text.querySelector('.text-shadow');
				if (!$shadow) {
					$shadow = document.createElement('div');
					$shadow.classList.add('text-shadow');
					const $h6Clone = $h6.cloneNode(true);
					$shadow.appendChild($h6Clone);
					$text.appendChild($shadow);
				}

				$shadow.style.left = `${-dxFromCenter - $shadow.offsetWidth / 2}px`;
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
	
	imgMove();
}

window.addEventListener('DOMContentLoaded', () => {
    onRenderListComplete();
});

document.addEventListener('mousemove', function(e) {
	const x = e.pageX - 10;
	const y = e.pageY - 10;
	$cursor.style.left = x + 'px';
	$cursor.style.top = y + 'px';
});

function handleCursorStyle(opacity, transformScale) {
    $cursor.style.opacity = opacity;
    $cursor.style.transform = `scale(${transformScale})`;
}

function handleTextShadow($text, transformScale) {
    const $shadow = $text.querySelector('.text-shadow');
    if ($shadow) {
        $shadow.style.transform = `scale(${transformScale})`;
    }
}

const $texts = document.querySelectorAll('.text');

$texts.forEach($text => {
    $text.addEventListener('mouseover', function () {
        handleCursorStyle(1, 5);
        handleTextShadow($text, 0);
    });

    $text.addEventListener('mouseleave', function() {
        handleCursorStyle(0, 0);
        handleTextShadow($text, 1);
    });
});

function toLeft() {
	var rolling = $('.rolling .inner'),
		leftW = $('.rolling .inner p').outerWidth() * 1;
	
	setInterval(function(){
		rolling.animate({
			left: -leftW }, {
			duration: 20000,
			easing: 'linear',
			step: function () {},
			complete: function () {
				rolling.css({ left: 0 })
				$(this).find('p').first().appendTo(rolling);
			}
		});
	}, 10)
}
toLeft();
