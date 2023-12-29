$(document).ready(function () {
	
	let item = $(".item"),
		pinDistance = item.outerHeight() * item.length;
	
	gsap.set(".img-box", { autoAlpha: 1 });

	const timeline = gsap.timeline({
		defaults: {
			overwrite: "auto",
		},
		scrollTrigger: {
			pin: true,
			scrub: true,
			start: "top top",
			end: "+=" + (pinDistance * 1.2),
			trigger: "main .inner",
			scroller: ".scroll-container",
		},
	});

	const stagger = 0.8;

	gsap.set(".img-box", { autoAlpha: 1 });

	timeline
		.from(item, {
			stagger: stagger,
			y: "100vh",
			opacity: 0,
			// duration: 1,
			overwrite: true,
		})
		.to(item, {
			stagger: stagger,
			y: "0",
			opacity: 1,
			// duration: 1,
			overwrite: true,
		}, stagger)
	
		ScrollTrigger.refresh();

	$(".mode-button").on("click", function () {
		$(".scroll-wrap, .mode-button").toggleClass("dark light");
	});

});