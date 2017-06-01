$(document).ready(function(){
	var topics = [];
	//console.log(topics);
	
	function displayAnimalInfo(){
		var topic = $(this).attr("data-name");

		//console.log("topic");
    		var queryURL ="http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";
    		//creates a call to ajax/callbacks
    		$.ajax({
    			url:queryURL,
    			method:"GET"
    		}).done(function(response){
    			// display content of response
    			//console.log(response);
    			//saves results on a variable
    			var results = response.data;
    			//console.log(results);
    			for(var i = 0; i <results.length; i++)
				{
					//Generic Div to hold all the animal results
					var animalDiv = $("<div class= 'gifs'>");
					
					var p = $('<p>').text("Rating: "+results[i].rating);
					//apending the image but to work need a div to show content
					animalDiv.append(p);		

					var animalImage = $('<img>');
					animalImage.attr('src', results[i].images.fixed_height.url);
					///apending the image but to work need a div to show content
					animalDiv.append(animalImage,'<br>'+'<br>');

					// will be used later to animate gifs
					animalImage.attr('data-state','still');
					animalImage.addClass("gif");

					var animalKingdom = $('<img>') ;
					animalKingdom.attr('data-still',results[i].images.fixed_width_small_still.url);
					animalDiv.append(animalKingdom);

					var aKingdom = $('<img>') ;
					aKingdom.attr('data-animate',results[i].images.fixed_height.url);
					animalDiv.append(aKingdom);

					// contents work together with the div displayImage first image get appended it then need a div to show content on div displayImage
					
					$("#gifsAnimals").prepend(animalDiv);
				}// end of for loop
			});	
			//function animates the gifs
		$(document).on("click", ".gif", function(){
		var state = $(this).attr('data-state');
		if ( state == 'still'){
		    $(this).attr('src', $(this).data('animate'));
		    $(this).attr('data-state', 'animate');
		}else{
		    $(this).attr('src', $(this).data('still'));
		    $(this).attr('data-state', 'still');
		}
		});


	}//end of displayAnimalInfo

	// creates buttons 
	function createButtons(){
			// this is a MUST prevents button duplicates
    		$("#animalButtons").empty();

    		for(var i = 0; i < topics.length; i++){
    			//creating a button dynamically
    			var a = $('<button>').addClass("btn btn-primary btn-lg");
    			
    			//add a class attribute
    			a.attr(('data-name'), topics[i]);
    			//shows text
    			a.text(topics[i]);
    			//$("#add-animal").val();
    			//append button to id of animalButtons
    			$("#animalButtons").append(a);
    		}//end for
    	}//end of createbuttons

    	
    	//handles eventswhen add button is clicked
    	$("#add-animal").on("click", function(event){
    		event.preventDefault();
    		//grabs the user input, trims the spaces out
    		console.log("this an animal");
    		
    		var topic = $("#animal-input").val().trim();
    		topic = $("#animal-input").val();
    		//adds an animal into the array
    		topics.push(topic);

    		//createbutt on is called to display and  button on the screen
    		createButtons();
    		//enables users to hit enter instead of enter key
    		return false;

    	});
    	//adding click event listeners to all elements with class of topic
    $("button").on("click",displayAnimalInfo());

});//end of ready function