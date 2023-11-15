$(document).ready(function () {
	$("html, body").animate({
		scrollTop: 0
	}, 20);

	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) {
		if (ua.indexOf('chrome') > -1) {
			// Chrome
			$("body").addClass("chrome")
		} else {
			// Safari
			$("body").addClass("safari")
		}
	}

	setTimeout(function () {
		$(".ready").stop().fadeOut();
	}, 400);

	var header = $("header"),
		footer = $(".footer"),
		animation = $(".animation"),
		visual = $(".visual"),
		sectionTitle = $(".sectionTitle"),
		sliderButton = $(".sliderButton"),
		recruit = $(".recruit"),
		isScroll = false,
		topButton = $(".topButton");
	
				
	animation.each(function () {
		var delay = $(this).data("delay");
		$(this).css({
			"transition-delay": delay
		})
	});

	sectionTitle.each(function () {
		var count = 0;
		$(this).find("b").each(function (index) {
			var text = $(this).text();
					appendB = "<span>" + text.split("").join('</span><span>') + "</span>";		
			$(this).html(appendB);
		})

		$(this).find("span").each(function () {
			$(this).eq(count)
			count++;
			$(this).attr("class", "span" + count);
		});
	});

	var mySwiper = undefined;
	function initSwiper() {
		if ($(window).width() >= 1200 && mySwiper == undefined) {
			var mySwiper = new Swiper("main .swiper", {
				direction: "vertical",
				speed: 1200,
				slidesPerView: 1,
				watchSlidesProgress: true,
				mousewheel: true,
				mousewheelControl: true,
				on: {
					init: function () {
						setTimeout(function () {
							$(".visual .animation").addClass("on");
						}, 420);
					},
					slideChangeTransitionEnd: function () {
						$(".swiper-slide-active").find(".animation").addClass("on");
					},
					transitionEnd: function (index) {
						if (mySwiper.realIndex == 0 || mySwiper.realIndex == 3) {
							header.attr("class", "colorW")
						}
						if (mySwiper.realIndex == 1) {
							header.attr("class", "colorD")
						}
						if (mySwiper.realIndex == 2 || mySwiper.realIndex == 4) {
							header.attr("class", "colorL")
						}
						if (mySwiper.realIndex == 1) {
							mySwiper.mousewheel.disable();
		
							var our = $(".our"),
								itemBox = our.find(".itemBox"),
								itemBoxTop = itemBox.offset().top,
								item = itemBox.children("div");
							if (itemBoxTop <= 160) {
								$(".our .blur").stop().fadeIn();
							}
							our.find(".contents").on("scroll mousewheel DOMMouseScroll", function (e) {
								var E = e.originalEvent;
								delta = 0;
								delta = E.wheelDelta;
								var scrollTop = $(this).scrollTop(),
									innerHeight = $(this).innerHeight(),
									scrollHeight = $(this).prop("scrollHeight");
								item.each(function (index) {
									var itemTop = $(this).offset().top;
									var innerHeight = $(".our .contents").innerHeight() * 0.6;
									if (innerHeight >= itemTop) {
										$(this).addClass("on");
									} else {
										$(this).removeClass("on");
									}
								});
								if (delta < 0) {
									$(".our .blur").stop().fadeIn();
								}
								if (scrollTop + innerHeight >= scrollHeight && delta < 0) {
									mySwiper.mousewheel.enable();
									mySwiper.slideTo(2);
									$(".our .blur").stop().fadeOut();
								}
								if (scrollTop == 0 && delta > 0) {
									mySwiper.mousewheel.enable();
									mySwiper.slideTo(0);
									$(".our .blur").stop().fadeOut();
								}
							});
						}
						if(mySwiper.realIndex == 4) {
							mySwiper.mousewheel.disable();
						}
					}
				},
			});
			$(window).on("scroll mousewheel DOMMouseScroll", function (e) {
				var E = e.originalEvent;
				delta = E.wheelDelta;
				var fireE = e.originalEvent.detail,
					scrollTop = $(this).scrollTop();
				if (delta < 0 || fireE > 0) {
					// down
		
					if (!isScroll) {
						isScroll = true;
					}
				} else if (delta > 0 || fireE < 0) {
					// up
					
					if (isScroll) {
						if (scrollTop <= 0) {
							isScroll = false;
							mySwiper.mousewheel.enable();
						}
					}
				}
			});
			$(".depth1").find("li").each(function () {
				$(this).on("click", function () {
					var index = $(this).index();
					if (index == 0) {
						mySwiper.slideTo(0);
					} else if (index == 1) {
						mySwiper.slideTo(1);
					} else if (index == 2) {
						mySwiper.slideTo(5);
						$("html, body").stop().animate({
							scrollTop: $(".what").offset().top
						}, 200, "linear");
						return false;
					} else if (index == 3) {
						mySwiper.slideTo(5);
						$("html, body").stop().animate({
							scrollTop: $(".recruit").offset().top
						}, 200, "linear");				
					}
				})
			})
		} else if ($(window).width() < 1198&& mySwiper != undefined) {
			mySwiper.destroy(true);
			mySwiper = undefined;
		}
	}
	initSwiper();

	sliderButton.on("click", function () {
		visual.find(".animation").removeClass("on");
		setTimeout(function () {
			visual.find(".animation").addClass("on");
		}, 800)
	});

	var visualSwiper = new Swiper(".visual .slideBox", {
		effect: "fade",
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 4200,
			disableOnInteraction: false,
		},
		watchSlidesProgress: true,
		navigation: {
			prevEl: ".visual .prevButton",
			nextEl: ".visual .nextButton",
		},
	});

	topButton.on("click", function () {
		$("html, body").stop().animate({
			scrollTop: 0
		}, 800, "linear", function () {
			mySwiper.mousewheel.enable();
			mySwiper.slideTo(0);
		}, 0);
	});
	
	$(window).on("scroll", function () {
		var scrollTop = $(this).scrollTop();
		animation.each(function () {
			var animationTop = $(this).offset().top;
			if (scrollTop >= animationTop - 600) {
				$(this).addClass("on");
			} else {
				// $(this).removeClass("on");
			}
		})
	});
	
	$(window).on("load resize", function () {
//		initSwiper();
		var windowWidth = $(window).width();

		// do
		var doInfoBox = $(".do").find(".infoBox"),
			doItemBox = $(".do").find(".itemBox");
		$(".do").find(".item").each(function () {
			$(this).on("click", function () {
				var number = $(this).find("h6.down").text().split("0")[1]
				parseInt(number)
				console.log(number)
				doInfoBox.addClass("on");
				doItemBox.addClass("off");
				if (!doInfoBox.find(".item").length) {
					$(this).clone().prependTo(doInfoBox)
				}
				doInfoBox.find(".text p").removeClass("on");
				doInfoBox.find(".text p").eq(number - 1).addClass("on");
			})
		})
		doInfoBox.find(".closeButton").on("click", function () {
			doItemBox.removeClass("off");
			doInfoBox.removeClass("on");
			doInfoBox.find(".item").remove();
			doInfoBox.find(".text p").removeClass("on");
		})

		if (windowWidth < 1200) {
			var visual = $(".visual");
			$(".swiper").children(".swiper-wrapper").removeClass("swiper-wrapper");
			visual.css({
				"height": $(window).height()
			})
			visual.find(".animation").addClass("on");
		}
		// partner
		var partner = $(".partner"),
			partnerImgs = parseInt(partner.find(".img").length),
			partnerInfoBox = partner.find(".infoBox"),
			partnerInfo = partnerInfoBox.find(".info").outerHeight() + 55,
			partnerInfoHeight = [],
			count = 0;
		if (windowWidth >= 960) {
			
		} else {
			partner.css({
				"height": "auto"
			});
			partner.find("h2").prependTo(partner.find(".contents"));
			partner.find(".img").each(function (index) {
				var info = partner.find(".info").eq(count);
				info.prepend($(this))
				count++;
			});

			recruit.find(".galleryBox").insertAfter(recruit.find(".title"))
		}
		
		var scrollContent = $("#scrollContent"),
			what = scrollContent.find(".what"),
			resultHeight = $(".swiper").outerHeight() + what.outerHeight() + footer.outerHeight();
		
	});

});