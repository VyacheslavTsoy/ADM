var scrollerOptions = {
	scrollerType:"hoverAccelerate",
	scrollerOrientation:"vertical",
	scrollEasing:"easeOutCirc",
	scrollEasingAmount:800,
	acceleration:0.1,
	scrollSpeed:2500,
	noScrollCenterSpace:10,
	autoScrolling:0,
	autoScrollingSpeed:2000,
	autoScrollingEasing:"easeInOutQuad",
	autoScrollingDelay:500
}

var flexslideroptions = {
	animation: "slide",
	animationLoop: true,
	itemWidth: ' ',
	controlNav: false,
	slideshow: false,
	smoothHeight: true,
	variableImageWidth: true,
	bannerSelector: "div.slideshow_banner",
	itemBannerShowClass: 'show-banner'
}

var owlparams = {
	items : 2,
	itemsDesktop : [1199,2],
	itemsDesktopSmall : [980,2],
	addClassActive: true,
	navigation: true,
	pagination: false,
	navigationText:  [" "," "],
	slideSpeed: 1800,
	rewindSpeed : 4000
}

var owl;
var isContacts = false;

// add Google API


function addMarker() 
{
    markers.push(new google.maps.Marker({
    position: egglabs,
    raiseOnDrag: false,
    icon: image,
      map: map,
      draggable: false
      }));
    
}
var map;
var egglabs = new google.maps.LatLng(55.783644,37.601241);
var mapCoordinates = new google.maps.LatLng(55.783644,37.601241);

var markers = [];
var image = new google.maps.MarkerImage(
  'https://dl.dropboxusercontent.com/u/5337679/ADM/Layout/Desktop/adm_marker.png',
  new google.maps.Size(133,66),
  new google.maps.Point(0,0),
  new google.maps.Point(42,56)
);
function initialize() {
	w = $("div.map_wrapper").width();
	h = "500px";
	//$("div#map-canvas").css({width:w+"px",height:h});	
	
	var mapOptions = {
	backgroundColor: "#ffffff",
	zoom: 16,
	disableDefaultUI: true,
	  center: mapCoordinates,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	addMarker();
}

function hide_spinner(){
	$(".spinner").fadeOut(1500);
	$("body").addClass("show");
	$("div#preloader").css("opacity", "1");
	$.get("home.html",{}, function(data){
		$("div#content_inner").html(data);
		initHomeResize();
		$("div#preloader").fadeOut("fast");
	});
}
function imgSize(){
	$(".slides li").each(function(){
		var imgW = $(this).find("img").width();
		var imgH = $(this).find("img").height();
		var contentW = $("#content").width();
		var contentH = $("#content").height();

		if(imgW > imgH){
			$(this).find("img").width(contentW).css({"height": "auto"});
		}
		if(imgW < imgH){
			$(this).addClass("fullheight");
		}
	});
	
}
function initContentResize()
{
	if ($(window).width() > 768){
	    $("#carousel").owlCarousel(owlparams);
	    owl = $("#carousel").data('owlCarousel');
	}
	$(window).unbind("resize");
	$(window).resize(function(){
		if ($(window).width() < 769){
			if (owl)
				owl.destroy();
		} else {
			$("#carousel").owlCarousel(owlparams);
			owl = $("#carousel").data('owlCarousel');
		}
	});
}
function initHomeResize(){
	
	$(window).unbind("resize");
	$(window).resize(function(){
		if ($(window).width() < 769){
			if( $('.flexslider').data('flexslider') ) {
			    $('.flexslider').flexslider('destroy');
			}
			$("#portfolio_slider .viewport").unbind('mousemove');
		} else {
			if(! $('.flexslider').data('flexslider') ) {
			    $('.flexslider').flexslider(flexslideroptions);
			}
			$("#portfolio_slider .viewport").unbind('mousemove');
			$("#portfolio_slider .viewport").thumbnailScroller(scrollerOptions);
		}
		imgSize();
    });
	imgSize();
	if ($(window).width() > 768){
            $('.flexslider').flexslider(flexslideroptions);
            $("#portfolio_slider .viewport").thumbnailScroller(scrollerOptions);
    }
}
$(window).load(function() {
	$('#portfolio_slider').tinycarousel({
		axis: 'y',
		display: 1,
		controls: false,
		interval: false,
		duration: 800,
		mouseWheel: true
	});
	
	$("#show_menu").click(function(){
          $(".m_navigation").addClass("in");
    });
	
	$(".spinner").addClass("show");
    setTimeout(hide_spinner, 3000);
    $("body").addClass("show")
	

	$("ul#menu>li>a").click(function(){
		$(".m_navigation").removeClass("in");
		var path = $(this).attr("href");
		isContacts = (path.indexOf("contacts")==-1)?false:true;
		$("li.portfolio_item").removeClass("current_item");
		$("ul#menu>li").removeClass("current");
		$(this).parent("li").addClass("current");
			
		$("div#preloader").fadeIn("fast", function(){
			$.get(path, {}, function(data){
				$("div#content_inner").html(data);				
				initContentResize();
				if (isContacts) 
				{
					initialize();
				}
				$("div#preloader").fadeOut("fast");
			});
		});
			
		
		return false;
	});
	$("li.portfolio_item a").click(function(){
		$("ul#menu>li").removeClass("current");
		var path = $(this).attr("href");
		$("li.portfolio_item").removeClass("current_item");
		var $parent = $(this).closest("li");
		$parent.addClass("current_item");
		

		$("div#preloader").fadeIn("fast", function(){
			$.get(path, {}, function(data){
				$("div#content_inner").html(data);	
				initHomeResize();
				$("div#preloader").fadeOut("fast");
			});
		});


		return false;
	});
	
	$("a#nbgallery").click(function(){
		path = $(this).attr("href");
		$.get(path, {}, function(data){
					$("div#content_inner").html(data);
					$(".m_navigation").removeClass("in");					
		})
		return false;
	})
});
