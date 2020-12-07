  //=============== Usefull function ===============

  //block scroll
  function blockScroll(){
    document.querySelector("body").classList.add('no-scroll')
  }
  function toggleScroll(){
    document.querySelector("body").classList.toggle('no-scroll')
  }
  //Scroll Indication
  function hideScrollIndication(){
    document.querySelector(".scrollIndication").classList.add('opacity-0');
  }
  function showHideScrollIndication(){
    document.querySelector(".scrollIndication").classList.toggle('opacity-0');
  }
  //Checks if an element is fully visibible on the screen
  function isFullyVisibleOnScreen(element){
    let position = element.getBoundingClientRect();
    if(position.top >= 0 && position.bottom <= window.innerHeight && position.left >= 0 && position.right <= window.innerWidth)
      return true;
    return false;
  }
  //Checks if an element is partially visibible on the screen
  function isPartiallyVisibleOnScreen(element){
    let position = element.getBoundingClientRect();
    if(position.top < window.innerHeight && position.bottom >= 0 && position.left < window.innerWidth && position.right >= 0)
      return true;
    return false;
  }