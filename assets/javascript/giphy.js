//PSEUDOCODE

//TODO When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

//TODO Under every gif, display its rating (PG, G, so on).

$(document).ready(function() {

//GLOBAL VARIABLES
var topics = ["star trek", "books", "simpsons", "weird al"]
var index = 0

//ajax function calls 10 gifs from API, creates img inputs and appends necessary attributes
function callGifs (){

var gifName = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + gifName + "&api_key=dc6zaTOxFJmzC"

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
    console.log(response);

    //TODO function for switching still-animate.
    function animateSwitch (){

      var $thisStill = $(this).attr("data-still");
      var $thisAnimated = $(this).attr("data-animated");
      var $thisSrc = $(this).attr("src");
      console.log($thisSrc);

      if ($thisSrc === $thisStill) {
        $thisSrc = $(this).attr("src", $thisAnimated)

    } else if ($thisSrc === $thisAnimated) {
        $thisSrc = $(this).attr("src", $thisStill);
    }
  }

    $(document).on("click", ".gifSrc", animateSwitch);

  // for loop calls gifs, creates elements, attributes data and prepends.
  for (index = 0; index < 10; index++){

    var gifStill = response.data[index].images.downsized_still.url;
    var gifAnimate = response.data[index].images.downsized.url;
    var rating = response.data[index].rating;
    var gifInput = $("<input>");

    gifInput.addClass("gifSrc");
    gifInput.attr("value", true);
    gifInput.attr("id", index);
    gifInput.attr("type", "image");
    gifInput.attr("data-still", gifStill); // write a function to swap "data-still" w/ "data-animated onclick"
    gifInput.attr("data-animated", gifAnimate);
    gifInput.attr("src", gifStill);
    gifInput.attr("alt", "gif goes here");
    $(".gifContainer").prepend(gifInput, rating);
    }
  });
};




  function renderButtons() {

    // Deleting the topics prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $(".topics-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // dynamic buttons
      var a = $("<button>");
      // Adding a class
      a.addClass("topicButton");
      // Added a data-attribute
      a.attr("data-name", topics[i]);
      // Provided the initial button text
      a.text(topics[i]);
      // Added the button to the HTML
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

renderButtons();

});//document ready endtag
