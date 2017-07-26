$(document).ready(function() {

	var currentPage = 0;
	var starCreationInterval;
	var heartCreationInterval;
	var starDestroyInterval;
	var killTimeout;
	var blue = "#213076";
	var red = "#DD4733";

	function displayPage(type) {
		if (type === "shows") {
			$("#pop-up .content").html("");
			$("#pop-up").css("background", "#D7DD4D");
			$("#pop-up .content").html("");
		} else if (type === "lyrics") {
			if (currentPage === 0) {
				$("#pop-up .content").html("");
				setFontColors(blue);
				$("#pop-up").css("background", "#C4CB9C");
				$("#pop-up .content").html("<h1>LYRICS</h1><h4>Wish</h4><p>You walked me home that night<br /> Counted our steps as they aligned<br /> Endless circles, losing track of time<br />Wishful thinking about you and I<br /><br />I think that you and I<br />can start something<br />Real tonight<br /><br />A quick smile upon your gaze<br />Getting lost in clouds of gray<br />They tried to warn me but I already knew<br />Wishful thinking, I'm stuck on you<br /><br />Oh could I be the one<br />I think that you and I<br />can start something<br />Real tonight</p><br /><h4>Clear</h4><p>Midnight hour <br />Take this heart away <br /><br />Life of sin <br />Live it everyday <br /><br />Lust after <br />The pleasures of the flesh <br /><br />This town <br />Is bringing me down in the worst ways <br /><br />I can't keep running away <br />From all the mistakes <br />That I have made <br />Used to fill a void <br />No care of consequence <br />learn to let go <br />learn to move on <br />learn to not compare <br />learn to not despair <br />And <br /><br />Do the things <br />I never had the courage to do <br />Never take for granted <br />All the love that's given to me <br />Say the words <br />I could never say <br />It's time <br />I live my life for me</p><br /><h4>Wonder</h4><p>You went away <br />Maybe it's all too soon <br />talking too far ahead <br />where did you think we'd be by now <br />share this world with me <br />I'm a telephone call away <br />please know it's all sincere <br />Please know I'll always be here <br />Overjoyed is being with you <br /><br />One <br />more <br />night <br />by your side <br />make me feel <br />Make me feel alive <br /><br />If only <br />just a for awhile <br />Contemplating your smile <br />I'd hope to see you again <br />Maybe it's all too soon <br />Talking too far ahead <br />Where are we now <br />I'm miles away <br />Please know it's all sincere <br />If I could just ask for <br /><br />One <br />More <br />Night <br />By your side <br />Make me feel <br />Make me feel alive (make my heart full)<br /></p><br /><br />");
			} else if (currentPage === 1) {
				$("#pop-up .content").html("");
				setFontColors(red);
				$("#pop-up").css("background", "#C4CB9C");
				$("#pop-up .content").html("<h1>LYRICS</h1><h4>Violet</h4>");
			}
		}
	}

	function setFontColors(color) {
		$("#main-content h1, #main-content a, #main-content i, #pop-up .content h1, #pop-up .content h4").css("color", color);
	}

	function createParticle(string,left, size, color) {
		$("#star-wrapper").append("<div class='star' style='left: " + left + "%; font-size: " + size + "; color:" + color + ";' >" + string + "</div>");
	}

	function killStar() {
		$("#star-wrapper .star:nth-child(1)").remove();
	}

	function startKilling() {
		killTimeout = setTimeout(function() {
			starDestroyInterval = setInterval(function() {
				killStar();
			}, 1000);
		}, 5000);
	}

	function createHearts() {
		heartCreationInterval = setInterval(function() {
			var randomLeft = Math.random() * 100;
			createParticle("♥", randomLeft, "1em", "#DD4733");
		}, 1000);
	}

	function createStars() {
		starCreationInterval = setInterval(function() {
			var randomLeft = Math.random() * 100;
			createParticle("★", randomLeft, "1em", "#213076");
		}, 1000);
	}

	function moveMenus(direction) {
		if (direction === "up") {
			$(".menu").css("z-index", "0");
			$(".col-xs-6").css("z-index", "1");
			$(".col-xs-6, .menu").css("position", "relative");
			$(".col-xs-6, .menu").animate({
				top: "-35px"
			}, 500);
		} else if (direction === "down") {
			$(".col-xs-6, .menu").animate({
				top: "0px"
			}, 500);
		}
	}

	function switchAlbum(direction, data) {
		if (direction === "left") {
			if (currentPage === 1) {
				currentPage--;
				$(".scroller-left").css("opacity", "0.3");
				$(".scroller-right").css("opacity", "1");
				$("#star-wrapper").html("");
				$(".star").css("color", "#213076");
				clearInterval(heartCreationInterval);
				clearTimeout(killTimeout);
				clearInterval(starDestroyInterval);
			}
			data.preventDefault();
			$(".moveable").animate({
				left: "0"
			}, 500);
			moveMenus("down");
			setTimeout(function() {
				setFontColors("#213076");
			}, 500);	
			createStars();
			startKilling();
		} else if (direction === "right") {
			if (currentPage === 0) {
				currentPage++;
				$(".scroller-right").css("opacity", "0.3");
				$(".scroller-left").css("opacity", "1");
				$("#star-wrapper").html("");
				$(".star").css("color", "#DD4733");
				clearInterval(starCreationInterval);
				clearTimeout(killTimeout);
				clearInterval(starDestroyInterval);
			}
			data.preventDefault();
			$(".moveable").animate({
				left: "-100%"
			}, 500);
			moveMenus("up");
			setTimeout(function() {
				setFontColors("#DD4733");
			}, 500);
			createHearts();
			startKilling();
		}
	}

	// Shows Link
	$(".shows-link").on("click", function(data) {
		data.preventDefault();
		displayPage("shows");
		$("#pop-up").animate({
			top: "0"
		}, 600);
	});

	// Lyrics Link
	$(".lyrics-link").on("click", function(data) {
		data.preventDefault();
		displayPage("lyrics");
		$("#pop-up").animate({
			top: "0"
		}, 600);
	});

	// Closes Bottom Tab
	$("#pop-up button").on("click", function(data) {
		data.preventDefault();
		$("#pop-up").animate({
			top: "100%"
		}, 600);
	});


	// Side Scrollers
	$(".scroller-left").on("click", function(data) {
		switchAlbum("left", data);
	});

	$(".scroller-right").on("click", function(data) {
		switchAlbum("right", data);
	});

	$(".moveable").on("swipeleft", function(data) {
		switchAlbum("left", data);
	});

	$(".moveable").on("swiperight", function(data) {
		switchAlbum("right", data);
	});


	// Star Generators
	createStars();


	startKilling();

});