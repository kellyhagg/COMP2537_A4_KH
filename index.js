
let firstCard = undefined
let secondCard = undefined
let timerRunning = false;

var difficulty = "easy";
var timeAllowed = 100;
var timeElapsed = 0;
var totalPairs = 3;
var numMatches = 0;
var numRemainingPairs = totalPairs;
var numClicks = 0;

var theme = "light";

const setup = () => {

  numClicks = 0;
  numMatches = 0;
  numRemainingPairs = totalPairs;

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

  if (theme == "light") {
    lightTheme();
  } else {
    darkTheme();
  }
}

const start = () => {
  if (timerRunning) {
    return;
  }

  $("#startBtn").hide();
  $(".game_grid").show();
  $(".themeBtns").show();

  let timerCounter = setInterval(function () {
    timeElapsed++;
    $("#timer").html(timeElapsed);
  }, 1000);

  timerRunning = true;
};


const click = () => {
  $(".card").on("click", function () {
    if ($(this).hasClass("flip") || $(this).hasClass("disabled")) {
      return;
    }

    numClicks++;
    $(".headerNumClicks").html(`Number of Clicks: ${numClicks}`);

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
      $(this).toggleClass("flip");
    } else if (!secondCard) {
      secondCard = $(this).find(".front_face")[0];
      $(this).toggleClass("flip");

      if (firstCard.src === secondCard.src) {
        console.log("match");
        numMatches++;
        numRemainingPairs--;
        $(".headerMatches").html(`Number of Matches: ${numMatches}`);
        $(".headerRemainingPairs").html(`Number of Pairs Left: ${numRemainingPairs}`);

        $(`#${firstCard.id}`).parent().addClass("disabled");
        $(`#${secondCard.id}`).parent().addClass("disabled");
        firstCard = null;
        secondCard = null;
      } else {
        console.log("no match");
        setTimeout(() => {
          if (firstCard) {
            $(`#${firstCard.id}`).parent().removeClass("flip");
            firstCard = null;
          }
          if (secondCard) {
            $(`#${secondCard.id}`).parent().removeClass("flip");
            secondCard = null;
          }
        }, 1000);
      }
    }

    if (numMatches === totalPairs) {
      setTimeout(() => {
        alert("You win!");
        setup();
      }, 500);
    }
  });
};

const flipAllCards = () => {
  setTimeout(() => {
    $(".card").toggleClass("flip");
  }, 1000);
  setTimeout(() => {
    $(".card").toggleClass("flip");
  }, 2000);
};


const powerup = () => {
  console.log("powerup");
  console.log(numClicks);
  if (numClicks == 7 || numClicks == 15 || numClicks == 23) {
    flipAllCards();
  }
};

const cards = () => {

  firstCard = undefined;
  secondCard = undefined;

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
    <div class="card" onclick=powerup()>
      <img id="img${i + 1}" class="front_face" src="${imgNames[i]}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
  `;
  }

  $(".game_grid").html(html);
  $(".game_grid").hide();
  $(".themeBtns").hide();

  click();
}

const lightTheme = () => {
  theme = "light";
  $("body").css("background-color", "white");
  $(".headerTotalPairs").css("color", "black");
  $(".headerMatches").css("color", "black");
  $(".headerRemainingPairs").css("color", "black");
  $(".headerNumClicks").css("color", "black");
  $(".headerTimeAllowed").css("color", "black");
  $(".headerTimeElapsed").css("color", "black");
}

const darkTheme = () => {
  theme = "dark";
  $("body").css("background-color", "black");
  $(".headerTotalPairs").css("color", "white");
  $(".headerMatches").css("color", "white");
  $(".headerRemainingPairs").css("color", "white");
  $(".headerNumClicks").css("color", "white");
  $(".headerTimeAllowed").css("color", "white");
  $(".headerTimeElapsed").css("color", "white");
}

$(document).ready(() => {
  $("#startBtn").on(("click"), function () {
    start();
  });

  $("#resetBtn").on("click", () => {
    $("#startBtn").show();
    setup(difficulty);
    $(".game_grid").show();
    $(".themeBtns").show();
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

  $("#lightThemeBtn").on("click", () => {
    lightTheme();
  });

  $("#darkThemeBtn").on("click", () => {
    darkTheme();
  });

  setup();
});