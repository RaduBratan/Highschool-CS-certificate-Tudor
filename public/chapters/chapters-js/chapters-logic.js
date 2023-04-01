/*
######################################
----------------GLOBAL----------------
######################################
*/
luxy.init();

/*
######################################
----------------INTRO----------------
######################################
*/
$(document).ready(function () {
    $(".chapter-page").addClass("chapter-page-animation-reveal");

    $(".close-chapter").css("opacity", 0);
    $("p").css("opacity", 0);
    $("h3").css("opacity", 0);
    $("iframe").css("opacity", 0);

    setTimeout(() => {
        $(".chapter-page").removeClass("chapter-page-animation-reveal");

        $(".close-chapter").css("opacity", 1);
        $("p").css("opacity", 1);
        $("h3").css("opacity", 1);
        $("iframe").css("opacity", 1);
    }, 1000);
});

const chapter_tlmx = new TimelineMax();
const chapter_text = document.querySelectorAll(".chapter-name-row div");

chapter_tlmx.fromTo(
    chapter_text,
    1,
    {
        autoAlpha: 0,
        yPercent: 100
    },
    {
        autoAlpha: 1,
        yPercent: 0,
        ease: Power4.easeInOut
    },
    0
);
chapter_tlmx.play();

/*
#####################################
----------------CLICK----------------
#####################################
*/
$(".close-chapter").click(function () {
    $(".chapter-page").addClass("chapter-page-animation-reveal");

    $(".close-chapter").css("animation-direction", "reverse");
    $("p").css("animation-direction", "reverse");
    $("h3").css("animation-direction", "reverse");
    $("iframe").css("animation-direction", "reverse");

    setTimeout(() => {
        $(".chapter-page").removeClass("chapter-page-animation-reveal");

        $(".close-chapter").css("animation-direction", "reverse");
        $("p").css("animation-direction", "reverse");
        $("h3").css("animation-direction", "reverse");
        $("iframe").css("animation-direction", "reverse");

        $(".close-chapter").css("opacity", 0);
        $("p").css("opacity", 0);
        $("h3").css("opacity", 0);
        $("iframe").css("opacity", 0);
        history.back();
    }, 1000);
});