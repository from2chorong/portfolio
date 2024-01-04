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
    ScrollTrigger.kill();
    $(".img-box .item").each(function () {
        let index = $(this).index();
        let topValue = "-100vh";
        let leftValue = (index % 4) * 25 + "%";

        // Check if the index is within specific ranges
        if (index >= 4 && index <= 7) {
            topValue = "-75vh";
        } else if (index >= 8 && index <= 11) {
            topValue = "-50vh";
        } else if (index >= 12 && index <= 15) {
            topValue = "-25vh";
        }

			$(this).animate({
					width: "25%",
					top: topValue,
					left: leftValue,
					opacity: "1",
        });

			$(this).css({
          transitionDelay: index * 0.2,
        });
    });
});



});