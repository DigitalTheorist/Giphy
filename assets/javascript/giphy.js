//PSEUDOCODE
//When the user clicks on a button, the page should grab 10 TODO:static, non-animated gif images from the GIPHY API and place them on the page.

//TODO When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

//TODO Under every gif, display its rating (PG, G, so on).

// Only once you get images displaying with button presses should you move on to the next step.

// Add a form to your page that takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array AND remakes the buttons on the page.
    //TODO use .val() to get value of form input.


// Rejoice! You just made something really cool.

$(document).ready(function() {

// giphy public bete key: dc6zaTOxFJmzC

//GLOBAL VARIABLES
var topics = ["star trek", "books", "insects", "disney"]
var index = 0

function callGifs (){

var gifName = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + gifName + "&api_key=dc6zaTOxFJmzC"

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) { //calls 10 gifs from API

  for (index = 0; index < 11; index++){
    // console.log(index);
    // console.log(response.data[index].images.downsized.url);
    var gifEmbed = response.data[index].images.downsized.url;
    var rating = response.data[index].rating;
    var img = $("<img>");
    img.addClass("gifSrc");
    img.attr("src", gifEmbed);
    img.attr("alt", "gif goes here");
    $(".gifContainer").prepend(img, rating);

    // console.log(img)
    // console.log(queryURL);
    // console.log(response);
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


$(document).on("click", ".topicButton", callGifs);

renderButtons();

});//document ready endtag

// $(".gifSrc").click( //animated or static gif
//        function()
//        {
//            $(this).attr("src", gifEmbed);
//        },
//        function()
//        {
//            $(this).attr("src", "STATIC IMAGE URL HERE");
//        });
