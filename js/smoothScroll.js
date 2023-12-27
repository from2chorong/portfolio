gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector(".scroll-container"),
		smooth: true
	});

	locoScroll.on("scroll", ScrollTrigger.update);

	ScrollTrigger.scrollerProxy(".scroll-container", {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		},
		getBoundingClientRect() {
			return {
				width: window.innerWidth,
				height: window.innerHeight,
				top: 0,
				left: 0
			};
		},

		pinType: document.querySelector(".scroll-container").style.transform
			? "transform"
			: "fixed"
	});

	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
	ScrollTrigger.refresh();