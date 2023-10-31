$(document).ready(function () {
	ScrollTrigger.refresh();

	gsap.registerPlugin(ScrollTrigger);
	
	const circleMove = gsap.timeline();
	circleMove
		.to(".blurCircle", { left: "5%" })
		.to(".blurCircle", { left: "85%", scale: 0.4 })
		.to(".blurCircle", { left: "5%", scale: 1.2 })
		.to(".blurCircle", { left: "40%", scale: 2 })
		.to(".blurCircle", { left: "75%", scale: 0.6 })
		.to(".blurCircle", { left: "5%", scale: 1.2 })
		.to(".blurCircle", { left: "50%", scale: 2.2 })
		.to(".blurCircle", { left: "4%", bottom: "10%", scale: 1 })
	
	ScrollTrigger.create({
		animation: circleMove,
		trigger: ".scroll-container",
		start: "top top",
		end: "right bottom",
		scrub: true,
	});
})