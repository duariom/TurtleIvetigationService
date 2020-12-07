document.addEventListener("DOMContentLoaded", function () {
  //=====================================================================
  //                              INIT
  //=====================================================================

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  //=====================================================================
  //                              CODE
  //=====================================================================

  let container = document.getElementById("container");
  let sections = gsap.utils.toArray("section");
  let elements = gsap.utils.toArray(document.querySelectorAll(".parallax"));


  let timeline = gsap.timeline();

  timeline.to(sections, {
    x: () =>
      -(container.scrollWidth - document.documentElement.clientWidth) + "px",
    ease: "none",
    scrollTrigger: {
      pin: true,
      scrub: 1,
      overwrite: "auto",
      trigger: container,
      end: () => container.scrollWidth - document.documentElement.clientWidth
    }
  });

  let scrollTriggerTimeline = gsap.timeline();

  // parallax de la 

  elements.forEach((element) => {
    scrollTriggerTimeline.from(element, {
      xPercent: 20, //tu changes la
      overwrite: "auto",
       ease: "none",
      scrollTrigger: {
        scrub: 1,
        start: () => element.parentNode.offsetLeft - window.innerWidth,
        end: () =>
          element.parentNode.offsetLeft -
          window.innerWidth +
          element.parentNode.getBoundingClientRect().width
      }
    });
  });

  elements.forEach((element) => {
    scrollTriggerTimeline.to(element, {
      xPercent: 20, //et la
      overwrite: "auto",
      scrollTrigger: {
        scrub: 1,
        immediateRender: false,
        start: () =>
          element.parentNode.offsetLeft -
          element.parentNode.getBoundingClientRect().width / 2,
        end: () =>
          element.parentNode.offsetLeft +
          element.parentNode.getBoundingClientRect().width
      }
    });
  });

  // à de la  et si tu veux differents paralax, tu dupliques le code
 
  const navigationBegin = Date.now()
  //=============== Landing page ===============

  var landingPage = document.querySelector(".landing-page");
  var landingPageBottleButton = document.querySelector(".landing-page-bottle-btn");
  var landingPageButton = document.querySelector(".landing-page-btn");

  /*Not working*/
  window.scrollTo(0,0); 

  /* Trigger parchment */
  landingPageBottleButton.addEventListener('click', function () {
      document.querySelector('.landing-page-parchment').classList.toggle('hide')
      document.querySelector('.bottle-parchment').classList.add('opacity-0');
  });

  /* Hide landing page */
  landingPageButton.addEventListener('click', function () {
    toggleScroll();
    //Trigger animation
    landingPage.classList.add("hide")
  });


  var landingPageSoundButton = document.querySelector(".landing-page-sound");  
  landingPageSoundButton.addEventListener("click", function(){
    //Cut sound
    toggleSound()
  })

  function toggleSound(){
    landingPageSoundButton.querySelector(".sound-on").classList.toggle('hide')
    landingPageSoundButton.querySelector(".sound-off").classList.toggle('hide')
  }


  //=============== Ending page ===============
  var endingPage = document.querySelector(".ending-page")
  var endingPageCounter = document.querySelector(".ending-page-counter")

  function calculatePlasticQuantity(){
    setInterval(() => {
      const timeElapseInMilliseconds = Date.now() - navigationBegin;
      let timeElapse = Math.floor(timeElapseInMilliseconds / 1000);
      // TODO update stats
      let plasticQuantity = timeElapse * 63.4;
      endingPageCounter.innerHTML = Math.round(plasticQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }, 1000);
  }


  //=============== Scroll ===============
  // Setup isScrolling variable
  var isScrolling;

  // Listen for scroll events
  window.addEventListener('scroll', function ( event ) {
    animationModuleUpDown();
    setTurtleAnimations("move");
    changeCharactersDirection();

    // Clear our timeout throughout the scroll
    window.clearTimeout( isScrolling );

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
      // Reset default animations
      setTurtleAnimations("idle");

    }, 400);

    if(isPartiallyVisibleOnScreen(endingPage)){
      console.log('test')
      calculatePlasticQuantity()
    }

  }, false);

  var scrollPosition = 0;
  function detectScrollDirection(){
    let value = "down";
    if(document.body.getBoundingClientRect().top > scrollPosition){
      scrollPosition = document.body.getBoundingClientRect().top;
      return "up"
    }
    else if (document.body.getBoundingClientRect().top < scrollPosition){
      scrollPosition = document.body.getBoundingClientRect().top;
      return "down"
    }
  }

  //=============== Animation ===============
  var arrayModuleUpDown = document.querySelectorAll(".module-up-down")
  //Translates section background to give deep illusion
  function animationModuleUpDown(){
    arrayModuleUpDown.forEach(function(moduleUpDown){
      let moduleUpDownOffsetLeft = moduleUpDown.parentNode.offsetLeft;
      let moduleUpDownOffsetRight = moduleUpDownOffsetLeft + moduleUpDown.offsetWidth;
      let maxOffsetRight = moduleUpDownOffsetRight - window.innerWidth;
      
      if(window.scrollY > moduleUpDownOffsetLeft && window.scrollY < maxOffsetRight){
        let scrollPositionInModule = window.scrollY - moduleUpDownOffsetLeft;
        let scrollArea = maxOffsetRight - moduleUpDownOffsetLeft;
        let ratio = (scrollPositionInModule/scrollArea)*100;
        if(moduleUpDown.getAttribute("data-direction")=="up"){
          ratio = 100-ratio;
          moduleUpDown.style.transform = "translateY(-"+ratio+"vh)";
        }
        else if(moduleUpDown.getAttribute("data-direction")=="down")
          moduleUpDown.style.transform = "translateY(-"+ratio+"vh)";
      }
      //if the user has already passed a section
      else if(window.scrollY > moduleUpDownOffsetRight){
        if(moduleUpDown.getAttribute("data-direction")=="up")
          moduleUpDown.style.transform = "translateY(0vh)";
        else if(moduleUpDown.getAttribute("data-direction")=="down")
          moduleUpDown.style.transform = "translateY(-100vh)";
      }
    })
  }

  var turtle = document.querySelector(".turtle");
  var paw1 = document.querySelector(".turtle-paw1");
  var paw2 = document.querySelector(".turtle-paw2");
  var paw3 = document.querySelector(".turtle-paw3");
  var paw4 = document.querySelector(".turtle-paw4");

  //Changes animation if the turtle move
  function setTurtleAnimations(status){
    if(status == "move"){
      turtle.style.animationName = "turtle_global_animation_move";
      paw1.style.animationName = "turtle_pow_right_animation_move";
      paw2.style.animationName = "turtle_pow_left_animation_move";
      paw3.style.animationName = "turtle_pow_right_animation_move";
      paw4.style.animationName = "turtle_pow_left_animation_move";
    }
    else if(status == "idle"){
      turtle.style.animationName = "turtle_global_animation";
      paw1.style.animationName = "turtle_pow_right_animation";
      paw2.style.animationName = "turtle_pow_left_animation";
      paw3.style.animationName = "turtle_pow_right_animation";
      paw4.style.animationName = "turtle_pow_left_animation";
    }
    
  }

  //Change turtle direction according to scroll direction
  function changeCharactersDirection(){
    let turtleSVG = document.querySelector(".svg-turtle");
    let seahorseSVG = document.querySelector(".svg-seahorse");
    let scrollDirection = detectScrollDirection();
    if(scrollDirection == "down"){
      turtleSVG.style.transform = "scale(1,1)";
      seahorseSVG.style.transform = "scale(-1,1)";
    }
    else if(scrollDirection == "up"){
      turtleSVG.style.transform = "scale(-1,1)";
      seahorseSVG.style.transform = "scale(1,1)";
    }

  }

  //Turtle eye animation
  var turtleEye = document.querySelector(".turtle-eye");
  turtleEyeAnimation();
  function turtleEyeAnimation(){
      //eye closed
      turtleEye.style = "opacity:0;"
    setTimeout(function(){
      turtleEye.style = "opacity:1;"
    },80);
    setTimeout(function(){
      turtleEyeAnimation();
    },Math.floor(Math.random() * (4000 - 600 + 1) ) + 600);
    
  }
  //Seahorse eye animation
  var seahorseEye = document.querySelector(".seahorse-eye");
  seahorseEyeAnimation();
  function seahorseEyeAnimation(){
      //eye closed
      seahorseEye.style = "opacity:0;"
    setTimeout(function(){
      seahorseEye.style = "opacity:1;"
    },80);
    setTimeout(function(){
      seahorseEyeAnimation();
    },Math.floor(Math.random() * (4000 - 1000 + 1) ) + 1000);
    
  }





/*TEMP */
var mortyContainer = document.querySelector(".morty-container");
var mortySVG = document.querySelector(".morty-container svg");
var mortyOpenImg = document.querySelector(".morty-open");
mortyContainer.addEventListener("click", function(){
  mortyContainer.classList.toggle("morty-bigger");
  mortyOpenImg.classList.toggle('opacity-0')
})

});
