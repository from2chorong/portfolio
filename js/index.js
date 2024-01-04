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

	$(".list-button").on("click", function () {

    // Using GSAP to animate the items
		$(".img-box .item").each(function (index, element) {
			$(this).css("align-items", "flex-start");
			$(this).find(".cont").css("height", "50%");
			let leftValue = (index % 4) * 25 + "%";
			let topValue;

			switch (true) {
				case index >= 4 && index <= 7:
					topValue = "50%";
					break;
				case index >= 8 && index <= 11:
					topValue = "100%";
					break;
				case index >= 12 && index <= 15:
					topValue = "150%";
					break;
				default:
					topValue = "0";
			}

			gsap.to(element, {
				width: "25%",
				y: topValue,
				left: leftValue,
				opacity: 1,
				duration: 0.2,
				delay: index * 0.02,
			});
    });
	});





});