


const setup = (difficulty) => {
  let firstCard = undefined
  let secondCard = undefined

  const imgNames = [
    "001.png", "002.png", "003.png", "001.png", "002.png", "003.png",
    "004.png", "005.png", "006.png", "004.png", "005.png", "006.png",
    "007.png", "008.png", "009.png", "007.png", "008.png", "009.png",
    "010.png", "011.png", "012.png", "010.png", "011.png", "012.png"
  ];

  var numCards;

  if (difficulty == "medium") {
    $(".game_grid").attr("id", "medium_grid");
    numCards = 12;
  } else if (difficulty == "hard") {
    $(".game_grid").attr("id", "hard_grid");
    numCards = 24;
  } else {
    $(".game_grid").attr("id", "easy_grid");
    numCards = 6;
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


  $(".card").on(("click"), function () {
    $(this).toggleClass("flip");

    if (!firstCard)
      firstCard = $(this).find(".front_face")[0]
    else {
      secondCard = $(this).find(".front_face")[0]
      console.log(firstCard, secondCard);
      if (
        firstCard.src
        ==
        secondCard.src
      ) {
        console.log("match")
        $(`#${firstCard.id}`).parent().off("click")
        $(`#${secondCard.id}`).parent().off("click")
      } else {
        console.log("no match")
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip")
          $(`#${secondCard.id}`).parent().toggleClass("flip")
        }, 1000)
      }
    }
  });
}

$(document).ready(() => {
  $("#easyBtn").on("click", () => {
    setup("easy");
  });

  $("#mediumBtn").on("click", () => {
    setup("medium");
  });

  $("#hardBtn").on("click", () => {
    setup("hard");
  });

  setup("easy");
});