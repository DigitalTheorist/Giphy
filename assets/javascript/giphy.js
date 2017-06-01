$(document).ready(function() {

//GLOBAL VARIABLES
var topics = ["star trek", "books", "simpsons", "weird al", "space", "forests", "laughter", "blue", "Paris", "Garden", "banjo", "Cold Beer", "Yoga", "Dune", "Bootcamp"]
var index = 0

//Ajax function calls 10 gifs from API, creates img inputs and appends necessary attributes
function callGifs (){

$(".gifContainer").empty(); //empty container before filling

var gifName = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + gifName + "&api_key=dc6zaTOxFJmzC"

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {


  // for loop calls gifs, creates elements, attributes data and prepends to DOM.
  for (index = 0; index < 10; index++){

    var gifStill = response.data[index].images.downsized_still.url; //calls still gif image
    var gifAnimate = response.data[index].images.downsized.url; //calls moving gif image
    var rating = response.data[index].rating; //calls gif rating

    var gifInput = $("<input>");  //Creates input element for each gif
    gifInput.addClass("gifSrc");  //Creates gif class
    gifInput.attr("type", "image"); //applies type to input element
    gifInput.attr("data-still", gifStill);  //stores still gif in data element
    gifInput.attr("data-animated", gifAnimate); //stores moving gif in data element
    gifInput.attr("src", gifStill); //Attributes the still gif (initially) to the input src
    gifInput.attr("alt", "gif goes here");  //Attributes "gif goes here to the alt tag"

    var ratingInput = $("<p>")
    ratingInput.addClass("gifRating");  //Adds class to <h5> tag for rating.
    ratingInput.text(rating);

    $(".gifContainer").prepend(gifInput);
    $(".gifContainer").prepend(ratingInput);

     //prepends gifs to thd DOM element TODO style rating (add <p> element?)
    }
  });
};


$(document).on("click", ".gifSrc", animateSwitch);

//Still/Animated function
  function animateSwitch (){

    var $thisStill = $(this).attr("data-still");
    var $thisAnimated = $(this).attr("data-animated");
    var $thisSrc = $(this).attr("src");

    if ($thisSrc === $thisStill) {
    $thisSrc = $(this).attr("src", $thisAnimated)

  } else if ($thisSrc === $thisAnimated) {
    $thisSrc = $(this).attr("src", $thisStill);
  }
}

//Render buttons function
  function renderButtons() {

    $(".topics-view").empty();

    for (var i = 0; i < topics.length; i++) {

      var a = $("<button>");

      a.addClass("topicButton");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $(".topics-view").append(a);
    }
  }

  // This function handles events where the add add-gif button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gifChoice = $("#gif-input").val().trim();
    // The add-gif from the textbox is then added to our array
    topics.push(gifChoice);
    // Calling renderButtons which handles the processing of our add-gif array
    renderButtons();
  });


$(document).on("click", ".topicButton", callGifs);

// clears input field upon entering the input.
$("#add-gif").on("click", function(){
  $("#gif-input").val(' ');
});

renderButtons();
});//document ready endtag
