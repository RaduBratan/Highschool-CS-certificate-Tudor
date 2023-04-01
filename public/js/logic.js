/*
######################################
----------------GLOBAL----------------
######################################
*/
var firebaseConfig = {
  apiKey: "ABCDE",
  authDomain: "???.firebaseapp.com",
  projectId: "???",
  storageBucket: "???.appspot.com",
  messagingSenderId: "ABCDE",
  appId: "ABCDE",
  measurementId: "ABCDE"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/*
######################################
----------------INTRO----------------
######################################
*/
$(document).ready(function () {
  $(".slideshow-container").css("visibility", "hidden");
  $(".open-chapter").css("visibility", "hidden");
  $(".intro-text-area").css("visibility", "visible");

  setTimeout(() => {
    slideshow_container.classList.add("animation-reveal");
    $(".open-chapter").addClass("open-chapter-animation-reveal");

    $(".slideshow-container").css("visibility", "visible");
    $(".open-chapter").css("visibility", "visible");
    $(".intro-text-area").css("visibility", "hidden");

    slideshow_container.style.background = bg_color_options[0];
    $(".text").css("opacity", "0");
    $(".image").css("opacity", "0");
    $(".image1").css("opacity", "0");
    $(".image2").css("opacity", "0");
    $(".previous-arrow").css("opacity", "0");
    $(".next-arrow").css("opacity", "0");
    $(".open-chapter").css("opacity", "0");

    setTimeout(() => {
      slideshow_container.classList.remove("animation-reveal");
      $(".open-chapter").removeClass("open-chapter-animation-reveal");

      slideshow_container.style.background = bg_color_options[0];
      $(".text").css("opacity", "1");
      $(".image").css("opacity", "1");
      $(".image1").css("opacity", "1");
      $(".image2").css("opacity", "1");
      $(".previous-arrow").css("opacity", "0.8");
      $(".next-arrow").css("opacity", "0.8");
      $(".open-chapter").css("opacity", "1");
    }, 1000);
  }, 3000);
});

const intro_tlmx = new TimelineMax();
const intro_text = document.querySelectorAll(".intro-text-row div");

intro_tlmx.fromTo(
  intro_text,
  1.5,
  {
    autoAlpha: 0,
    yPercent: 100
  },
  {
    autoAlpha: 1,
    yPercent: 0,
    ease: Power4.easeInOut,
    repeat: 1,
    yoyo: true
  },
  0
);
intro_tlmx.play();

/*
######################################
---------------CAROUSEL---------------
######################################
*/
var slideshow_container = document.getElementById("slideshow-container"),
  slides_container = document.getElementById("slides-container"),
  previous_arrow = document.getElementById("previous-arrow"),
  next_arrow = document.getElementById("next-arrow");

const bg_color_options = ["#BFEAFF", "#BFEAFF", "#BFEAFF", "#BFEAFF"];
const text_color_options = ["#111", "#111", "#111", "#111"];
const arrow_color_options = [
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23000'%3E%3C/polygon%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23000'%3E%3C/polygon%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23000'%3E%3C/polygon%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23000'%3E%3C/polygon%3E%3C/svg%3E"
];
const chapter_options = ["chapters/informatica.html", "chapters/algoritmi.html", "chapters/backtracking.html", "chapters/iterativitate.html"];
var k = 0;

function slide(
  slideshow_container,
  slides_container,
  previous_arrow,
  next_arrow
) {
  var posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = slides_container.getElementsByClassName("slide"),
    slidesLength = slides.length,
    slideSize = slides_container.getElementsByClassName("slide")[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  slides_container.appendChild(cloneFirst);
  slides_container.insertBefore(cloneLast, firstSlide);
  slideshow_container.classList.add("loaded");

  slides_container.onmousedown = dragStart;

  slides_container.addEventListener("touchstart", dragStart);
  slides_container.addEventListener("touchend", dragEnd);
  slides_container.addEventListener("touchmove", dragAction);

  slideshow_container.style.background = bg_color_options[k];
  $(".previous-arrow").css(
    "background-image",
    'url("' + arrow_color_options[k] + '")'
  );
  $(".next-arrow").css(
    "background-image",
    'url("' + arrow_color_options[k] + '")'
  );
  $(".text").css("color", text_color_options[k]);

  previous_arrow.addEventListener("click", function () {
    shiftSlide(-1);
    mouse.moved = false;

    slideshow_container.classList.add("animation-next");
    $(".open-chapter").addClass("open-chapter-animation-next");
    setTimeout(() => {
      slideshow_container.classList.remove("animation-next");
      $(".open-chapter").removeClass("open-chapter-animation-next");
    }, 650);

    if (k === 0) {
      k = bg_color_options.length;
    }
    k = k - 1;
    slideshow_container.style.background = bg_color_options[k];
    $(".previous-arrow").css(
      "background-image",
      'url("' + arrow_color_options[k] + '")'
    );
    $(".next-arrow").css(
      "background-image",
      'url("' + arrow_color_options[k] + '")'
    );
    $(".text").css("color", text_color_options[k]);
  });

  next_arrow.addEventListener("click", function () {
    shiftSlide(1);
    mouse.moved = false;

    slideshow_container.classList.add("animation-previous");
    $(".open-chapter").addClass("open-chapter-animation-previous");
    setTimeout(() => {
      slideshow_container.classList.remove("animation-previous");
      $(".open-chapter").removeClass("open-chapter-animation-previous");
    }, 650);

    k = k + 1;
    k = k % bg_color_options.length;
    slideshow_container.style.background = bg_color_options[k];
    $(".previous-arrow").css(
      "background-image",
      'url("' + arrow_color_options[k] + '")'
    );
    $(".next-arrow").css(
      "background-image",
      'url("' + arrow_color_options[k] + '")'
    );
    $(".text").css("color", text_color_options[k]);
  });

  slides_container.addEventListener("transitionend", checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = slides_container.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    slides_container.style.left = slides_container.offsetLeft - posX2 + "px";
  }

  function dragEnd(e) {
    posFinal = slides_container.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
      slideshow_container.classList.add("animation-previous");
      $(".open-chapter").addClass("open-chapter-animation-previous");
      setTimeout(() => {
        slideshow_container.classList.remove("animation-previous");
        $(".open-chapter").removeClass("open-chapter-animation-previous");
      }, 650);
      k = k + 1;
      k = k % bg_color_options.length;
      slideshow_container.style.background = bg_color_options[k];
      $(".previous-arrow").css(
        "background-image",
        'url("' + arrow_color_options[k] + '")'
      );
      $(".next-arrow").css(
        "background-image",
        'url("' + arrow_color_options[k] + '")'
      );
      $(".text").css("color", text_color_options[k]);
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
      slideshow_container.classList.add("animation-next");
      $(".open-chapter").addClass("open-chapter-animation-next");
      setTimeout(() => {
        slideshow_container.classList.remove("animation-next");
        $(".open-chapter").removeClass("open-chapter-animation-next");
      }, 650);
      if (k === 0) {
        k = bg_color_options.length;
      }
      k = k - 1;
      slideshow_container.style.background = bg_color_options[k];
      $(".previous-arrow").css(
        "background-image",
        'url("' + arrow_color_options[k] + '")'
      );
      $(".next-arrow").css(
        "background-image",
        'url("' + arrow_color_options[k] + '")'
      );
      $(".text").css("color", text_color_options[k]);
    } else {
      slides_container.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(direction, action) {
    slides_container.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = slides_container.offsetLeft;
      }

      if (direction == 1) {
        slides_container.style.left = posInitial - slideSize + "px";
        index++;
      } else if (direction == -1) {
        slides_container.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    slides_container.classList.remove("shifting");

    if (index == -1) {
      slides_container.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      slides_container.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}
slide(slideshow_container, slides_container, previous_arrow, next_arrow);

/*
######################################
----------------HOVER----------------
######################################
*/
var slideshow_parameters = $(".slideshow-container")[0].getBoundingClientRect();
var mouse = { x: 0, y: 0, moved: false };

$(".slideshow-container").mousemove(function (e) {
  mouse.moved = true;
  mouse.x = e.clientX - slideshow_parameters.left;
  mouse.y = e.clientY - slideshow_parameters.top;
});

$(".slideshow-container").mouseleave(function (e) {
  mouse.moved = false;
  mouse.x = e.clientX - slideshow_parameters.left;
  mouse.y = e.clientY - slideshow_parameters.top;
});

TweenLite.ticker.addEventListener("tick", function () {
  if (mouse.moved) {
    parallaxIt(".image-container", 25);
    parallaxIt(".text", -65);
  } else if (!mouse.moved) {
    parallaxIt(".image-container", 0);
    parallaxIt(".text", 0);
  }
});

function parallaxIt(target, movement) {
  TweenMax.to(target, 0.3, {
    x:
      ((mouse.x - slideshow_parameters.width / 2) /
        slideshow_parameters.width /
        2) *
      movement,
    y:
      ((mouse.y - slideshow_parameters.height / 2) /
        slideshow_parameters.height /
        2) *
      movement
  });
}

$(window).on("resize scroll", function () {
  slideshow_parameters = $(".slideshow-container")[0].getBoundingClientRect();
});

/*
##########################################
-----------------CLICK-----------------
##########################################
*/
$(".open-chapter").click(function () {
  slideshow_container.classList.add("animation-reveal");
  $(".open-chapter").addClass("open-chapter-animation-reveal");

  $(".text").css("animation-direction", "reverse");
  $(".image").css("animation-direction", "reverse");
  $(".image1").css("animation-direction", "reverse");
  $(".image2").css("animation-direction", "reverse");
  $(".previous-arrow").css("animation-direction", "reverse");
  $(".next-arrow").css("animation-direction", "reverse");
  $(".open-chapter").css("animation-direction", "reverse");

  slideshow_container.style.background = bg_color_options[0];

  setTimeout(() => {
    slideshow_container.classList.remove("animation-reveal");
    $(".open-chapter").removeClass("open-chapter-animation-reveal");

    $(".text").css("animation-direction", "reverse");
    $(".image").css("animation-direction", "reverse");
    $(".image1").css("animation-direction", "reverse");
    $(".image2").css("animation-direction", "reverse");
    $(".previous-arrow").css("animation-direction", "reverse");
    $(".next-arrow").css("animation-direction", "reverse");
    $(".open-chapter").css("animation-direction", "reverse");

    slideshow_container.style.background = bg_color_options[0];
    $(".text").css("opacity", "0");
    $(".image").css("opacity", "0");
    $(".image1").css("opacity", "0");
    $(".image2").css("opacity", "0");
    $(".previous-arrow").css("opacity", "0");
    $(".next-arrow").css("opacity", "0");
    $(".open-chapter").css("opacity", "0");

    $(".slideshow-container").css("visibility", "hidden");
    $(".slideshow-container").css("display", "none");
    $(".open-chpater").css("display", "none");
    $(".p1").css("visibility", "visible");
  }, 1000);

  setTimeout(() => {
    window.open(chapter_options[k], "_top");
  }, 1000);
});