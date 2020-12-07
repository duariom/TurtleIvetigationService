document.addEventListener("DOMContentLoaded", function () {
  var dialogueContainer = document.querySelector(".subtitles");
  var dialogueText = document.querySelector(".subtitles p");

  var currentSection = 0
  var currentIndex = 0;

  //Not working
  ajax('./json/dialogues.json', null, function(data){
    console.log(data);
  })
  //TEMP
  var dialogueArray = [
  [
    "<span class='turtle-dialogue'>Inspecteur Torty</span> : Quelle belle journée pour se balader !",
    "<span class='seahorse-dialogue'>Professeur Palmer</span> : C'est vrai qu'il fait plutôt doux pour un mois de décemb...",
    "Foule : AAAAAAAAAAAAAHHHHHHHHHHHH",
    "Foule : A l'aide !!! A l'aide !!!",
    "<span class='seahorse-dialogue'>Professeur Palmer</span> : Allons voir ce qu'il se passe Inspecteur Torty !",
  ],
  [
    "<span class='turtle-dialogue'>Inspecteur Torty</span> : Que se passe t-il ?",
    "Petit poisson : Mon ami Morty... Il s'étouffait, j'ai essayé de l'aider mais d'un seul coup ...",
    "<span class='seahorse-dialogue'>Professeur Palmer</span> : Voyons ce qu'il a mangé.",
  ],
  [
    "<span class='seahorse-dialogue'>Professeur Palmer</span> : C'est un véritable fléau !",
    "<span class='seahorse-dialogue'>Professeur Palmer</span> : De plus en plus de poissons comme Morty meurent étouffés par cette matière qui nous envahit de plus en plus.",
    "<span class='turtle-dialogue''>Inspecteur Torty</span> : Quelle matière ?",
    "<span class='seahorse-dialogue'>Professeur Palmer</span> : Le plastique Inspecteur Torty, le plastique !",
    "<span class='seahorse-dialogue'>Professeur Palmer</span> : Regardez ce sont les cas que j'ai pu étudier dans le passé. Tous ces animaux ont déjà ingérer du plastique.",
  ]
]
  
  //DEBUG
  document.addEventListener('keypress', function(event){
    if(event.code == "Numpad0"){
      toggleScroll();
      showHideScrollIndication()
      updateDialogue()
      toggleDialogues()
    }
  })
  
  document.querySelector(".subtitles-btn").addEventListener("click", function(){
    if(currentIndex == -1){
      toggleScroll();
      showHideScrollIndication();
      toggleDialogues()
      currentIndex++
    }
    else if(currentIndex == 0){
      toggleDialogues()
      updateDialogue()
    }
    else
      updateDialogue()
  })

  /*document.querySelector(".subtitles-button-show-hide").addEventListener("click", function(){
    toggleDialogues()
  })*/
  function updateDialogue(){
    dialogueText.innerHTML = dialogueArray[currentSection][currentIndex];
    if (currentIndex < dialogueArray[currentSection].length-1){
      currentIndex++;
    }
    else{
      if (currentSection < dialogueArray.length){
        currentSection ++;
      }
        
      currentIndex = -1;
    }
  }
  function toggleDialogues(){
    dialogueContainer.classList.toggle("hide");
  }
})