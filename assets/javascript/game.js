// trivia game javascript

// reset and document ready
$(document).ready(function () {

  $("#timeLeft").hide();
  $("#begin").on("click", trivia.beginGame);
  $(document).on("click", ".option", trivia.guessChecker);

})

// game variables for screen display and counters
var trivia = {

  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: "",

  // questions 
  questions: {
    q1: "Who was the legendary Benedictine monk who invented champagne?",
    q2: "Name the largest freshwater lake in the world?",
    q3: "Where would you find the Sea of Tranquility?",
    q4: "What is someone who shoes horses called?",
    q5: "What item of clothing was named after its Scottish inventor?",
    q6: "What kind of weapon is a falchion?",
    q7: "Which word goes before vest, beans and quartet?",
    q8: "What is another word for lexicon?",
    q9: "Name the seventh planet from the sun.",
    q10: "Who invented the rabies vaccination?"
  },

  // possible answers
  options: {
    q1: ["Buddha", "Pope John Paul", "Joseph III", "Dom Perignon"],
    q2: ["Lake Superior", "Lake Michigan", "Black Sea", "Lake Okeechobee"],
    q3: ["Earth", "The Moon", "Saturn", "Sun"],
    q4: ["A Farrier", "Horse Shoer", "Blacksmith", "Nike"],
    q5: ["Vest", "A Mackintosh", "Tuxedo", "Tie"],
    q6: ["A sword", "A Knife", "A Laser", "An Arrow"],
    q7: ["Sushi", "Silver", "String", "Top"],
    q8: ["Font", "Magic", "Type", "Dictionary"],
    q9: ["Mars", "Uranus", "Earth", "Moon"],
    q10: ["Neil Armstrong", "William Rabie", "Dr Mark", "Louis Pasteur"]

  },

  // correct answers
  answers: {
    q1: "Dom Perignon",
    q2: "Lake Superior",
    q3: "The Moon",
    q4: "A farrier",
    q5: "A Mackintosh",
    q6: "A sword",
    q7: "String",
    q8: "Dictionary",
    q9: "Uranus",
    q10: "Louis Pasteur"
  },

  // begin game function
  beginGame: function () {
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    $("#game").show();
    $("#answers").html("");
    $("#timer").text(trivia.timer);
    $("#begin").hide();
    $("#timeLeft").show();

    // inserts next question
    trivia.nextQuestion();
  },

  // next quesion

  nextQuestion: function () {

    trivia.timer = 10;
    $("#timer").removeClass("last-seconds");
    $("#timer").text(trivia.timer);

    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    $.each(questionOptions, function (index, key) {
      $("#options").append($('<button class= "option btn btn-info btn-lg">' + key + '</button>'));
    })

  },

  timerRunning: function () {

    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $("#timer").text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $("#timer").addClass("last-seconds");
      }

    } else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#answers").html("<h3>Out of time! The correct answer is " + Object.values(trivia.answers)[trivia.currentSet] + "</h3>");
      
    } else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      $("#answers")
        .html("<h3>Thank You For Playing Trivia!</h3>" + "<p>Correct: " + trivia.correct + "</p>" +
          "<p>Incorrect: " + trivia.incorrect + "</p>" +
          "<p>Unaswered: " + trivia.unanswered + "</p>");

      $("#game").hide();
      $("#begin").show();
    }

  },

  guessChecker: function () {

    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if ($(this).text() === currentAnswer) {

      $(this).addClass("btn-success").removeClass("btn-info");

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#answers").html("<h3>Congratulations You Guessed The Correct Answer!</h3>");
    } else {

      $(this).addClass("btn-danger").removeClass("btn-info");

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#answers").html("<h3>Nope, The Correct Answer Is: " + currentAnswer + "</h3>");
    }

  },

  guessResult: function () {
    trivia.currentSet++;
    $(".option").remove();
    $("#answers h3").remove();
    trivia.nextQuestion();

  }

}