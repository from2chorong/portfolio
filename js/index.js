$(document).ready(function () {
	ScrollTrigger.refresh();

	gsap.registerPlugin(ScrollTrigger);
	
	let circleMove = gsap.timeline(),
	pinDistance = $(".text-box").outerWidth()
	circleMove
		.to(".text-box", { fontSize: "16px" })
	
	ScrollTrigger.create({
		animation: circleMove,
		trigger: ".text-box",
		start: "top top",
		end: "+=" + (pinDistance * 2),
		pin: true,
		scrub: true,
	});

	$(".mode-button").on("click", function () {
		$(".scroll-wrap, .mode-button").toggleClass("dark light");
	});

	$(".list-button").on("click", function () {
		
	})
})