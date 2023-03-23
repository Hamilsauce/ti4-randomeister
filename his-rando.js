onEvent("martinPic", "click", function() {
  playSpeech("Hier stehe ich, ich kann nicht anders, Gott helfe mir! Amen!", "male", "Deutsch");
  setScreen("playerInputScreen");
});

/*********************************
 
  SEE LINES 32 and 71 for revisions
  
**********************************/

onEvent("player1", "input", function() {
  borderHighlight("player1");
});
onEvent("player2", "input", function() {
  borderHighlight("player2");
});
onEvent("player3", "input", function() {
  borderHighlight("player3");
});
onEvent("player4", "input", function() {
  borderHighlight("player4");
});
onEvent("player5", "input", function() {
  borderHighlight("player5");
});
onEvent("player6", "input", function() {
  borderHighlight("player6");
});


/*********************************

   Use 1 function/event handler instead of 6 by
   Listening for input events bubbling up to
   the parent of the input elements.

*********************************/

// hypothetical but definitely exists parent html element containing the group of html input elements
const parentOfInputs = document.querySelector('.name-input-container');

parentOfInputs.addEventListener('input', event => {
  const targetInput = event.target.closest('input');

  if (targetInput) {
    parentOfInputs.children.forEach((inputChild) => targetInput.classList.remove('highlight'))
    targetInput.classList.add('highlight');
  }
});




onEvent("randomizeButton", "click", function() {
  //checks to see if all player name boxes contain text before moving forward
  //then creates a list of powers and assigns each player a power
  //displaying each player name and assigned power

  if (
    (getText("player1") != "") &&
    (getText("player2") != "") &&
    (getText("player3") != "") &&
    (getText("player4") != "") &&
    (getText("player5") != "") &&
    (getText("player6") != "")
  ) {
    setScreen("resultsScreen");
    playSound("sound://category_board_games/card_dealing_multiple.mp3", false);


    /*********************************
   
      Create an array of objects to represent each Power;
  
      Replace the for loop containing 6 conditionals
      with the forEach method on the power objects array
    
     *********************************/

    const powers = [
      {
        name: 'The Ottoman Empire',
        color: 'green',
        image: 'otto.png',
      },
      {
        name: 'The Hapsburgs',
        color: 'yellow',
        image: 'haps.png',
      },
      {
        name: 'England',
        color: 'red',
        image: 'england.png',
      },
      {
        name: 'France',
        color: 'blue',
        image: 'france.png',
      },
      {
        name: 'Papacy',
        color: 'purple',
        image: 'pap.png',
      },
      {
        name: 'The Protestants',
        color: 'brown',
        image: 'prot.png',
      },
    ];

    // Better version of for loop on line 131
    powers.forEach((power, i) => {
      setText("player" + i + "Name", getText("player" + i) + " will play as");

      const index = randomNumber(0, powers.length - 1);

      setText("power" + i, power.name);

      removeItem(powers, index);

      setProperty("power" + i, power.color);
      setImageURL("image" + i, power.image);
      setImageURL("image" + (i + 6), power.image);
    });
    

    var powers = ["The Ottoman Empire", "The Hapsburgs", "England", "France", "Papacy", "The Protestants", ];

    for (var i = 1; i < 7; i++) {
      setText("player" + i + "Name", getText("player" + i) + " will play as");

      var index = randomNumber(0, powers.length - 1);

      setText("power" + i, powers[index]);

      removeItem(powers, index);

      //this conditional changes the text color based on the power and sets each image

      if (getText("power" + i) == "The Ottoman Empire") {
        setProperty("power" + i, "text-color", "green");
        setImageURL("image" + i, "otto.png");
        setImageURL("image" + (i + 6), "otto.png");
      } else if ((getText("power" + i) == "The Hapsburgs")) {
        setProperty("power" + i, "text-color", "yellow");
        setImageURL("image" + i, "haps.png");
        setImageURL("image" + (i + 6), "haps.png");
      } else if ((getText("power" + i) == "England")) {
        setProperty("power" + i, "text-color", "red");
        setImageURL("image" + i, "england.png");
        setImageURL("image" + (i + 6), "england.png");
      } else if ((getText("power" + i) == "France")) {
        setProperty("power" + i, "text-color", "blue");
        setImageURL("image" + i, "france.png");
        setImageURL("image" + (i + 6), "france.png");
      } else if (getText("power" + i) == "Papacy") {
        setProperty("power" + i, "text-color", "purple");
        setImageURL("image" + i, "pap.png");
        setImageURL("image" + (i + 6), "pap.png");
      } else {
        setProperty("power" + i, "text-color", "brown");
        setImageURL("image" + i, "prot.png");
        setImageURL("image" + (i + 6), "prot.png");
      }
    }


  } else {
    //reminder to user to complete all player name fileds before clicking 'randomize'
    playSound("sound://category_alerts/vibrant_game_negative_affirmation.mp3", false);
    setProperty("playerNameTitle", "text", "All 6 player names must be entered to proceed");
    setProperty("playerNameTitle", "font-size", 24);
    setProperty("playerNameTitle", "text-align", "center");
  }
});
onEvent("backButton1", "click", function() {
  playSpeech("OK", "male", "Deutsch");
  setScreen("Intro");
});
onEvent("backButton2", "click", function() {
  setScreen("playerInputScreen");
});
onEvent("backButton3", "click", function() {
  setScreen("resultsScreen");
});
onEvent("rulesAndTipsButton", "click", function() {
  //displays links to rule book and custom tips for each player based on their assigned power
  setScreen("rulesAndTips");
  for (var i = 1; i < 7; i++) {
    setProperty("player" + i + "Tips", "text", tips(getText("player" + i), getText("power" + i)));
    console.log(getText("player" + i));
    console.log(getText("power" + i));
  }
});
onEvent("ruleBook", "click", function() {
  open("https://s3-us-west-2.amazonaws.com/gmtwebsiteassets/nnhis/HIS_RULES-2017.pdf");
});
onEvent("scenarioBook", "click", function() {
  open("https://s3-us-west-2.amazonaws.com/gmtwebsiteassets/nnhis/HIS+SCENARIOSFINAL2017.pdf");
});
onEvent("player1Tips", "click", function() {
  quote(getText("power1"));
});
onEvent("player2Tips", "click", function() {
  quote(getText("power2"));
});
onEvent("player3Tips", "click", function() {
  quote(getText("power3"));
});
onEvent("player4Tips", "click", function() {
  quote(getText("power4"));
});
onEvent("player5Tips", "click", function() {
  quote(getText("power5"));
});
onEvent("player6Tips", "click", function() {
  quote(getText("power6"));
});
onEvent("docsButton", "click", function() {
  setScreen("docs");
});
onEvent("referenceCardButton", "click", function() {
  open("https://s3-us-west-2.amazonaws.com/gmtwebsiteassets/nnhis/HIS-PAC-1+2017.pdf");
});
onEvent("SequenceOfPlayButton", "click", function() {
  open("https://s3-us-west-2.amazonaws.com/gmtwebsiteassets/nnhis/HIS-PAC-2+SOP-2017.pdf");
});
onEvent("debaterCardButton", "click", function() {
  open("https://s3-us-west-2.amazonaws.com/gmtwebsiteassets/nnhis/HIS-PAC-3+Debater+Card+2017.pdf");
});
onEvent("ottoQuote", "click", function() {
  playSpeech("Allah'a kulluk en yüksek tahttır, makamların en hayırlısıdır.", "male", "Türkçe");
});
onEvent("hapsQuote", "click", function() {
  playSpeech("Hablo español a Dios, italiano a las mujeres, francés a los hombres y alemán a mi caballo.", "male", "Español (España)");
});
onEvent("engQuote", "click", function() {
  playSpeech("Come the three corners of the world in arms, And we shall shock them.", "male", "English");
});
onEvent("francQuote", "click", function() {
  playSpeech("Il ne me reste plus que l'honneur et ma vie qui est sauvée.", "male", "Français");
});
onEvent("papQuote", "click", function() {
  playSpeech("Innocenza inviolata", "male", "Italiano");
});
onEvent("protQuote", "click", function() {
  playSpeech("Frieden wenn möglich; Wahrheit um jeden Preis.", "male", "Deutsch");
});
onEvent("errataButton", "click", function() {
  open("https://s3-us-west-2.amazonaws.com/gmtwebsiteassets/nnhis/HIS_Errata+5-6-18.pdf");
});
onEvent("faqButton", "click", function() {
  open("http://his.kiefte.ca/home/game-rules/rules-faq");
});
onEvent("backButton4", "click", function() {
  setScreen("rulesAndTips");
});
onEvent("locationButton", "click", function() {
  open("https://www.google.com/maps/place/200+Ash+St,+Muscatine,+IA+52761/@41.4166258,-91.0569356,17z/data=!3m1!4b1!4m6!3m5!1s0x87e3e54a0bd860fb:0x640845359d2891d1!8m2!3d41.4166258!4d-91.0547416!16s%2Fg%2F11c27t_jg7");
});
//alters the border of the name input to indicate it has been filled and contains a string
function borderHighlight(playerName) {
  if (getText(playerName) != "") {
    setProperty(playerName, "border-color", "black");
  } else {
    setProperty(playerName, "border-color", rgb(166, 83, 65));
  }
}
//displays custom tips for each player based on their assigned power
function tips(playerName, power) {
  var tipsText = playerName.toUpperCase() + " as ";
  if (power == "The Ottoman Empire") {
    return (tipsText + power.toUpperCase() + ": No need to read rules on Reformation and New World.");
  } else if ((power == "The Hapsburgs")) {
    return ((tipsText + power.toUpperCase()) + ": No need to read rules on Reformation (other than Diet of Worms).");
  } else if ((power == "England")) {
    return (tipsText + power.toUpperCase() + ": No need to read rules on Piracy or Theological Debates.");
  } else if ((power == "France")) {
    return (tipsText + power.toUpperCase() + ": No need to read rules on Reformation.");
  } else if ((power == "Papacy")) {
    return (tipsText + power.toUpperCase() + ": No need to read rules on New World.");
  } else {
    return (tipsText + power.toUpperCase() + ": No need to read naval rules, minor power rules, or New World.");
  }
}

function quote(power) {
  if (power == "The Ottoman Empire") {
    playSpeech("Allah'a kulluk en yüksek tahttır, makamların en hayırlısıdır.", "male", "Türkçe");
  } else if ((power == "The Hapsburgs")) {
    playSpeech("Hablo español a Dios, italiano a las mujeres, francés a los hombres y alemán a mi caballo.", "male", "Español (España)");
  } else if ((power == "England")) {
    playSpeech("Come the three corners of the world in arms, And we shall shock them.", "male", "English");
  } else if ((power == "France")) {
    playSpeech("Il ne me reste plus que l'honneur et ma vie qui est sauvée.", "male", "Français");
  } else if ((power == "Papacy")) {
    playSpeech("Innocenza inviolata", "male", "Italiano");
  } else {
    playSpeech("Frieden wenn möglich; Wahrheit um jeden Preis.", "male", "Deutsch");
  }
}
