// ***** variables ********

//array of animals
var animals = ["horse", "dog", "elephant", "cat", "monkey", "mouse","turtle", "fish", "butterfly", "mongoose"];


// creates buttons based on array of animals

for (var i = 0; i < animals.length; i++){
	console.log(i);

}

//event listener for all button elements
$("button")on("click", function() {
	var animal = $(this).attr("animals[i]-placeholder")

	var queryURL = "http://api.giphy.com/v1/gifs/search?q" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
})

$.ajax({
	url: queryURL,
	method: "GET"
})

.done(function(response){
		var results = response.data;

	for(var i = 0; i < results.length; i++){
		if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
			var gifDiv = $("<div class = 'item'>");
			var rating = results[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			var animalImage = $("<img>");

			animalImage.attr("src", results[i].images.fixed_height.url);

			animals.append(p)
			animals.append(animalImage);

			$("#animals").prepend(animals);
		}
	}
});

// when gif is clicked, animates it if state was still, stops it if it's state was animate
$(".gif").on("click", function(){
	var state = $(this.attr("data-state");
		if(state === "still"){
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
		});
})