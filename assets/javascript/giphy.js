//PSEUDOCODE

//TODO When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

//TODO Under every gif, display its rating (PG, G, so on).

$(document).ready(function() {

//GLOBAL VARIABLES
var topics = ["star trek", "books", "simpsons", "disney"]
var index = 0
var animateSwitch = true;
var stillGif = "downsized_still"
var animateGif = "downsized"
var animateOrStill = "downsized_still"

//ajax function calls 10 gifs from API, creates img inputs and appends necessary attributes
function callGifs (){

var gifName = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + gifName + "&api_key=dc6zaTOxFJmzC"

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
    console.log(response);

  for (index = 0; index < 10; index++){

    // console.log(index);
    // console.log(response.data[index].images.downsized_still.url);

    var gifEmbed = response.data[index].images.downsized_still.url;
    var rating = response.data[index].rating;
    var gifInput = $("<input>");

    gifInput.addClass("gifSrc");
    gifInput.attr("id", index);
    gifInput.attr("type", "image");
    gifInput.attr("src", gifEmbed);
    gifInput.attr("alt", "gif goes here");
    $(".gifContainer").prepend(gifInput, rating);

    // console.log(img)
    // console.log(queryURL);
    // console.log(response);
    }
  });
};

function animateStill (){

var gifId = $(this).attr('id');
  console.log(gifId);

  if (animateSwitch === true){
    animateOrStill = stillGif
    animateSwitch = false
  } else {
    animateOrStill = animateGif
    animateSwitch = true
  }
  console.log(animateOrStill);
  console.log(animateSwitch);
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
$(document).on("click", ".gifSrc", animateStill);


renderButtons();

});//document ready endtag
