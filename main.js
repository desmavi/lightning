//MENU
const menuToggle = document.querySelector(".menu-toggle")
const navTag = document.querySelector("nav");
const line = document.querySelector(".line")

menuToggle.addEventListener("click", function(e) {
    e.preventDefault()
    
    navTag.classList.toggle("nav-open");
    navTag.classList.toggle("slide");
    if(navTag.classList.contains("nav-open")) {
        gsap.to(".burger-top", {rotation: 45, transformOrigin: "50% 50%", y: 8, fill: "black" } )
        gsap.to(".burger-bottom", {rotation: -45, transformOrigin: "50% 50%", y: -8, fill: "black"})
        gsap.to(".burger-mid", {width: 0})
    }
    else {
        gsap.to(".burger-top", {rotation: 0, y: 0, fill: "currentColor" } )
        gsap.to(".burger-bottom", {rotation: 0, y: 0, fill: "currentColor" })
        gsap.to(".burger-mid", {width:28 })
    }
})


//HORIZONTAL SCROLL
gsap.registerPlugin(ScrollTrigger);

//Set a media query > 767 for the horizontal scroll effect
ScrollTrigger.matchMedia({

    "(min-width: 767px)": function() {

    let sections = gsap.utils.toArray("section");

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".wrap",
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
            // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => "+=" + document.querySelector(".wrap").offsetWidth 
            }
        });
    }
})

//SET ANIMATION ON SCROLL

function init() {

//Change menu-toggle button color
    let wrap = document.querySelector(".wrap");
    let color = wrap.getAttribute('data-color');
    let credit = document.querySelector('.credits');

    ScrollTrigger.create({
        trigger: wrap,
        start:'top',
        endTrigger: credit,
        end: credit.offsetTop,
        onEnter: () => gsap.to('.menu-toggle', {color:color}), 
        onLeave: () => gsap.to('.menu-toggle', {color:'white'}), 
        onLeaveBack: () => gsap.to('.menu-toggle', {color:'white'}), 
        onEnterBack: () => gsap.to('.menu-toggle', {color:color})
    })


//Timeline for elements inside wrap
    let elements = gsap.utils.toArray(document.querySelectorAll("section > *:not(.one > *)"));

    const tl = gsap.timeline()

    //Fade in H1 and P of the first section
    tl.from(".vertical h1", 
        {  
            opacity: 0,
            ease: "power1.inOut"
        }
    )
    tl.from(".scroll", 
        { 
            opacity:0, 
            y: 20,
            delay:1
        }
    )
    //Change color of the bg of wrap
    tl.from('.bg', 
            { backgroundColor: '#000', 
                scrollTrigger: {
                    trigger: '.intro',
                    start:'center',
                    scrub:true,
                    ease: "power1.inOut"
                }
            }
        )

    // Animate only the children of the first child of wrap
    tl.from('.one > *', 
            { opacity: 0, 
                scrollTrigger: {
                    trigger: '.intro',
                    start:'center',
                    scrub:true,
                    ease: "power1.inOut"
                }
            }
        )
const section = document.querySelectorAll("section");

    //Animate all the children of each child of wrap, except the first one
    elements.forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
            trigger: element.parentNode, 
            start: element.parentNode.offsetLeft,
            ease: "power1.inOut",
            scrub:1
        },
            opacity: 0
        });
    })

    //Animate the credit section
    tl.from('.credits', {
            backgroundColor: '#fff',
            scrollTrigger: {
                trigger: '.anchor',
                start:'top',
                scrub: 1
            }
        })
        
}

//LOAD ANIMATIONS 
window.addEventListener('load', function() {
    init();
})

