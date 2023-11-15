$(document).ready(function () {


	let cont = document.querySelector(".img-box");
	let scrollTween = gsap.to(".item", {
		ease: "none",
		scrollTrigger: {
			trigger: cont,
			pin: cont,
			start: "center center",
			end: "+=" + 8000,
			scrub: 0.1,
		}
	});

	let targets = gsap.utils.toArray(".item");
	targets.forEach((item, index) => {
		gsap
			.timeline({
				ease: "none",
				scrollTrigger: {
					trigger: item,
					containerAnimation: scrollTween,
					start: "top center", // Adjust as needed
					end: "bottom center", // Adjust as needed
					pin: true,
					scrub: true,
				}
			})
			.fromTo(
				item,
				{ yPercent: 100 * index, opacity: 1 },
				{ yPercent: 0, opacity: 1 }
			);
	});
// 아시발모르겟다


	$(".mode-button").on("click", function () {
		$(".scroll-wrap, .mode-button").toggleClass("dark light");
	});

});