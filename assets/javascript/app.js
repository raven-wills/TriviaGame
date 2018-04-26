var quiz = [
  {
    question: "Why do scientists think urban legends exist?",
    choices: [
      "They reflect our fears",
      "They teach children lessons",
      "Just for fun",
      "They are cautionary tales"
    ],
    answer: "They reflect our fears"
  }
  // {
  //   question: "Who studies urban legends?",
  //   choices: ["Mythologist", "Anthropologist", "Folklorist", " Cereologists"],
  //   answer: "Folklorist"
  // }
  // {
  //   question: "When did the term 'Urban Legend' first appear?",
  //   choices: ["1930s", "1940s", "1950s", "1960s"],
  //   answer: "1960s"
  // },
  // {
  //   question: "Where does the 'Boggy Creek Monster' originate?",
  //   choices: ["Texas", "Mississippi", "Louisiana", "Arkansas"],
  //   answer: "Arkansas"
  // }
];

var currentQuestion = 0;
var correctAns = 0;
var incorrectAns = 0;
var unanswered = 0;
var number = 10;
var intervalId;

$("button").click(function(event) {
  console.log(event.currentTarget.innerText);
  answer(event.currentTarget.innerText);
});

function startGame() {
  $("#timer").css("display", "initial");
  $("#buttons").css("display", "initial");
  run();
}

function run() {
  if (currentQuestion < quiz.length) {
    $("#btnStart").css("display", "none");
    number = 10;
    $("#timer").html(number);
    intervalId = setInterval(decrement, 1000);
  } else {
    stop();
  }
}

function decrement() {
  number--;
  $("#timer").html(number);

  var secondsDegrees = number * 36 + 90;
  $(".second-hand").css("transform", "rotate(" + secondsDegrees + "deg)");

  if (number === 9) {
    var secondHand = $(".second-hand").css("transition", "none");
  } else {
    var secondHand = $(".second-hand").css("transition", "all 0.05s");
  }

  if (number === 0) {
    showMessage("Time Out!");
    unanswered++;
  }
}

function showMessage(message) {
  stop();
  $("#message")
    .show(
      setTimeout(function() {
        nextQuestion();
      }, 2000)
    )
    .text(message);
}

function answer(answerString) {
  if (quiz[currentQuestion].answer === answerString) {
    showMessage("Correct!");
    correctAns++;
  } else {
    showMessage("Incorrect!");
    incorrectAns++;
    $();
  }
  console.log(correctAns);
}

function stop() {
  clearInterval(intervalId);
}

stop();

function showQuestions() {
  if (currentQuestion < quiz.length) {
    // When true, quiz in progress
    $("#question").text(quiz[currentQuestion].question);
    $("#ans1").text(quiz[currentQuestion].choices[0]);
    $("#ans2").text(quiz[currentQuestion].choices[1]);
    $("#ans3").text(quiz[currentQuestion].choices[2]);
    $("#ans4").text(quiz[currentQuestion].choices[3]);
  } else {
    // Finished
    endScreen();
    stop();
  }
}

showQuestions();

function nextQuestion() {
  $(".second-hand").css("transform", "rotate(90deg)");
  $("#message").hide();
  currentQuestion++;
  showQuestions();
  run();
}

function endScreen() {
  $("#btnOver").css("display", "initial");
  $("#buttons").css("display", "none");
  $("#correct").text("Correct Answers: " + correctAns);
  $("#incorrect").text("Incorrect Answers: " + incorrectAns);
  $("#unanswered").text("Timed-Out: " + unanswered);
  $("#score").css("display", "initial");
  $(".clock").css("display", "none");
  $("#timer").css("display", "none");
  stop();
}
