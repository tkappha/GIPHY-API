$(document).ready(function(){

// ***** variables ********

//array of animals
var topics = ["horse", "dog", "elephant", "cat", "monkey", "mouse","turtle", "fish", "butterfly", "mongoose"];

var queryURL = "";
var animal = "";

// creates buttons based on array of animals
function populateButtons(arrayToUse, classToAdd, areaToAddTo){
	$(areaToAddTo).empty();

	for (var i = 0; i < arrayToUse.length; i++){
		var a = $("<button>");
		a.addClass(classToAdd);
		a.attr("data-type", arrayToUse[i]);
		a.text(arrayToUse[i]);
		$(areaToAddTo).append(a);

	}

}

//event listener for all button elements
$(document).on("click", ".animal-button", function() {
	
	$("#animals").empty();
	$(".animal-button").removeClass("active");
	$(this).addClass("active");

	var animal = $(this).attr("data-type");
	// console.log(animal);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+animal+"&limit=5&api_key=dc6zaTOxFJmzC";
	console.log(queryURL);

$.ajax({
	url: queryURL,
	method: "GET"
})

.done(function(response){
		var results = response.data;

		for(var i = 0; i <results.length; i++){
			var animalDiv = $("<div class=\"animal-item\">");
			var rating = results[i].rating;
			var p = $("<p>").text("Rating: " + rating);

			var animated = results[i].images.fixed_height.url;
			var still = results[i].images.fixed_height_still.url;

			var animalImage = $("<img>");

			animalImage.attr("src", still);
			animalImage.attr("data-still", still);
			animalImage.attr("data-animate", animated);
			animalImage.attr("data-state", "still");
			animalImage.addClass("animal-image");

			animalDiv.append(p)
			animalDiv.append(animalImage);

			$("#animals").prepend(animalDiv);
		}
	});
});

// when gif is clicked, animates it if state was still, stops it if it's state was animate
$(document).on("click",".animal-image", function(){
	var state = $(this).attr("data-state");
		if(state === "still"){
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

	$("#add-animal").on("click", function(event) {
		event.preventDefault();
		var newAnimal = $("input").eq(0).val();

		if(newAnimal.length > 2) {
			topics.push(newAnimal);
		}
		populateButtons(topics, "animal-button", "#animal-buttons");
	});

	populateButtons(topics, "animal-button", "#animal-buttons");
});