
let firstCard = undefined
let secondCard = undefined

var difficulty = "easy";
var timeAllowed = 100;
var timeElapsed = 0;
var totalPairs = 3;
var numMatches = 0;
var numRemainingPairs = totalPairs;
var numClicks = 0;

const setup = () => {
  $("#startBtn").show();

  cards();

  let html = `
  <h1 class="headerTotalPairs"> Total Number of Pairs: ${totalPairs} </h1>
  <h1 class="headerMatches"> Number of Matches: ${numMatches} </h1>
  <h1 class="headerRemainingPairs"> Number of Pairs Left: ${numRemainingPairs} </h1>
  <h1 class="headerNumClicks"> Number of Clicks: ${numClicks} </h1>
  <h1 class="headerTimeAllowed"> Time Allowed: ${timeAllowed} seconds</h1>
  <h1 class="headerTimeElapsed"> Time Elapsed: <span id="timer">${timeElapsed}</span>
 seconds!</h1>`;

  $(".pokeHeader").html(html);

  timeElapsed = 0;
}


const click = () => {
  $(".card").on("click", function () {
    numClicks++;
    $(".headerNumClicks").html(`Number of Clicks: ${numClicks}`);
    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else {
      secondCard = $(this).find(".front_face")[0];
      console.log(firstCard, secondCard);

      if (firstCard && secondCard && firstCard.src === secondCard.src) {
        console.log("match");
        numMatches++;
        numRemainingPairs--;
        $(".headerMatches").html(`Number of Matches: ${numMatches}`);
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");
      } else {
        console.log("no match");
        setTimeout(() => {
          if (firstCard) {
            $(`#${firstCard.id}`).parent().toggleClass("flip");
            firstCard = null;
          }
          if (secondCard) {
            $(`#${secondCard.id}`).parent().toggleClass("flip");
            secondCard = null;
          }
        }, 1000);
      }
    }
  });
};


const cards = () => {
  const imgNames = [
    "001.png", "002.png", "003.png", "001.png", "002.png", "003.png",
    "004.png", "005.png", "006.png", "004.png", "005.png", "006.png",
    "007.png", "008.png", "009.png", "007.png", "008.png", "009.png",
    "010.png", "011.png", "012.png", "010.png", "011.png", "012.png"
  ];

  var numCards;

  if (difficulty == "medium") {
    $(".game_grid").attr("id", "medium_grid");
    timeAllowed = 300;
    numCards = 12;
    totalPairs = 6;
    numRemainingPairs = totalPairs;
  } else if (difficulty == "hard") {
    $(".game_grid").attr("id", "hard_grid");
    timeAllowed = 200;
    numCards = 24;
    totalPairs = 12;
    numRemainingPairs = totalPairs;
  } else {
    $(".game_grid").attr("id", "easy_grid");
    timeAllowed = 100;
    numCards = 6;
    totalPairs = 3;
    numRemainingPairs = totalPairs;
  }

  let html = "";
  for (let i = 0; i < numCards; i++) {
    html += `
    <div class="card">
      <img id="img${i + 1}" class="front_face" src="${imgNames[i]}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
  `;
  }

  $(".game_grid").html(html);
  $(".game_grid").hide();

  click();
}

const start = () => {
  $("#startBtn").hide();
  $(".game_grid").show();

  let timerCounter = setInterval(function () {
    timeElapsed++;
    $("#timer").html(timeElapsed);
  }, 1000);

  const resetTimer = () => {
    timeElapsed = 0;
    $("#timer").html(timeElapsed);
  };
}

$(document).ready(() => {
  $("#startBtn").on(("click"), function () {
    start();
  });

  $("#resetBtn").on("click", () => {
    $("#startBtn").show();
    setup(difficulty);
    $(".game_grid").show();
    resetTimer();
  });

  $("#easyBtn").on("click", () => {
    difficulty = "easy";
    setup();
  });

  $("#mediumBtn").on("click", () => {
    difficulty = "medium";
    setup();
  });

  $("#hardBtn").on("click", () => {
    difficulty = "hard";
    setup();
  });

  setup();
});