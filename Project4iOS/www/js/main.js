/*
Elijah Freestone
AVF 1304
Project 4 iOS
4-26-13
*/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent("deviceready");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector(".listening");
        var receivedElement = parentElement.querySelector(".received");

        listeningElement.setAttribute("style", "display:none;");
        receivedElement.setAttribute("style", "display:block;");

        console.log("Received Event: " + id);
    }
};

$("#index").on("pageinit", function() {

	//Changepage function for api button
	$("#seeAPI").on("tap", function() {
		$.mobile.changePage($("#api"));
	});
	
	//Changepage function for mashups button
	$("#seeMashups").on("click", function() {
		$.mobile.changePage($("#mashup"));
	});
	
	//Changepage function for native button
	$("#seeNative").on("click", function() {
		$.mobile.changePage($("#native"));
	});
	
	//Changepage function for research button
	$("#seeResearch").on("click", function() {
		$.mobile.changePage($("#research"));
	});	
	
	//Changepage function for video button
	$("#seeVideo").on("click", function() {
		$.mobile.changePage($("#vidPage"));
	});
}); //End of index pageinit

$("#api").on("pageinit", function() {
	
	//Changepage function for facebook button
	$("#facebookBtn").on("click", function() {
		$.mobile.changePage($("#facebook"));
	});

	//Changepage function for twitter button
	$("#twitterBtn").on("click", function() {
		$.mobile.changePage($("#twitter"));
	});
}); //End of api pageinit

$("#facebook").on("pageinit", function() {
	//Facebook search API function
	$("#facebookSearch").on("click", function() {
		var fbTerm = $("#fbTerm").val();			
		
		if (fbTerm === "") {
			alert("Please enter a search term")
			return;
		}else{
			console.log($("#fbTerm").val());
			$("#fbResults").empty(); 
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "https://graph.facebook.com/search?q=" + fbTerm + "&type=post",
				data:{q: fbTerm},
				success: function(data) {
					console.log(data);
					$.each(data.data, function() {
						$("#fbResults").append($("<div>")
							.attr("class", "results")
                            .append($("<h1>" + "Status by: " + this.from.name + "</h1>")
                            .attr("class", "user"))
                            .append($("<img src=css/images/f_logo.jpg>"))
                            .append($("<h2>" + "ID #: " + this.from.id + "</h2>"))
                            .append($("<h3>" + this.message + "</h3>")
                            .attr("class", "result"))
                            .append($("<h4>" + this.created_time + "</h4>"))
                        );
                    });
                }
            });
		};
	});
}); //End of facebook pageinit

$("#twitter").on("pageinit", function() {
	//Twitter search API function
	$("#twitterSearch").on("click", function() {
		var twitTerm = $("#twitTerm").val();
		
		if (twitTerm === "") {
			alert("Please enter a search term")
			return;
		}else{
			console.log($("#twitTerm").val());
			$("#twitResults").empty(); 
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "http://search.twitter.com/search.json?include_entities=true",
				//include_entities: true,
				data:{q: twitTerm},
				success: function(data) {
					console.log(data);
					$.each(data.results, function() {
						$("#twitResults").append($("<div>")
							.attr("class", "results")
                            .append($("<h1>" + "Username: " + "@" + this.from_user + "</h1>")
                            .attr("class", "user"))
                            .append($("<img src=" + this.profile_image_url + ">"))
                            .append($("<h2>" + this.from_user_name + "</h2>"))
                            .append($("<h3>" + this.text + "</h3>")
                            .attr("class", "result"))
                            //.append($("<a href=" + this.entities.urls.expanded_url + ">" + this.entities.urls.url + "</a>"))
                            .append($("<h4>" + this.created_at + "</h4>"))
                        );
                    });
				}
			});
		};
	});
}); //End of twitter pageinit

$("#mashup").on("pageinit", function() {
	
	//Changepage function for google maps button
	$("#gMapsBtn").on("click", function() {
		$.mobile.changePage($("#gMapsPage"));
	});
	
	//Changepage function for weather button
	$("#weatherBtn").on("click", function() {
		$.mobile.changePage($("#weatherPage"));
	});

}); //End of mashup pageinit

$("#gMapsPage").on("pageinit", function() {

	$("#searchMap").on("click", function() {
		// Check if the browser or device supports the Geolocation API.
		if (navigator.geolocation) {
			// Get the location
			navigator.geolocation.getCurrentPosition(function(position) {
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				// Show the map
				displayMap(lat, lon);
			});
		} else {
			// Alert user.
			alert("Geolocation isn't supported or has been blocked.");
		}
	});

	// Show position on a map.
	function displayMap(lat, lon) {
		// Create a LatLng object with the geolocation coordinates.
		var myLocation = new google.maps.LatLng(lat, lon);

		// Create the Map Options
		var mapOptions = {
			zoom: 15,
			center: myLocation,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		$("#googleMap").empty(); 
		
		var googleMap = document.getElementById("googleMap");
        //Unhide map div element
        googleMap.style.display = "block";
		// Generate the Map from Google
		var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

		// Add a Marker to show current position
		var marker = new google.maps.Marker({
    		position: myLocation,
    		map: map,
    		title: "You are here!"
    	});
    };
}); //End of gMapsPage pageinit

$("#weatherPage").on("pageinit", function() {
	
	//var lat, lon;

	$("#getWeather").on("click", function(){
		//get current geolocation
		var success = function(position){
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			
			$("#weatherDisp").empty(); 
			//Retrieve current weather based on current geo
			$.ajax({
				url : "http://api.wunderground.com/api/193b989b6db00f80/geolookup/conditions/q/" + lat + "," + lon + ".json",
				dataType: "json",
				success: function(data){
				//console.log(data);
				var location = data.current_observation.display_location.full;
				var icon = data.current_observation.icon_url; 
				var temp = data.current_observation.temp_f;
				var weather = data.current_observation.weather;
				var feel = data.current_observation.feelslike_f;
				var time = data.current_observation.observation_time;
				//Displat current weather in weatherDisp
				$("#weatherDisp").append($("<div>")
                				 .attr("class", "results")
                				 .append($("<h1>" + location + "</h1>"))
                				 .append($("<img src=" + icon + ">")
                				 .attr("id", "weatherIcon"))
                				 .append($("<h2>" + "Current Weather: " + weather + "</h2>"))
                				 .append($("<h2>" + "Temp: " + temp + "&deg;F" + "</h2>"))
                				 .append($("<h3>"+"Feels Like: " + feel + "&deg;F" + "</h3>"))
                				 .append($("<h4>" + time + "</h3>"))
                	);
                }
            })
        }
    
    var error = function(error){
	    alert(error.message)
	}
		navigator.geolocation.getCurrentPosition(success, error);
	});
	
}); //End of weatherPage pageinit

$("#native").on("pageinit", function() {
	
	//Changepage function for camera button
	$("#camera").on("click", function() {
		$.mobile.changePage($("#cameraPage"));
	});

	//Changepage function for contacts button
	$("#contacts").on("click", function() {
		$.mobile.changePage($("#contactsPage"));
	});
	
	//Geolocation changePage and function call
	$("#geoloc").on("click", function() {
		$.mobile.changePage($("#geoPage"));
		setTimeout(showGeo, 1000);
	});
	
	//Changepage function for microphone button
	$("#mic").on("click", function() {
		$.mobile.changePage($("#micPage"));
	});
}); //End of native pageinit

$("#cameraPage").on("pageinit", function() {

	var pictureSource;   //picture source
	var destinationType; //sets the format of returned value 
    //Wait for Cordova to connect with the device
    document.addEventListener("deviceready",onDeviceReady,false);
    function onDeviceReady() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    };
    
    //Called when a photo is successfully retrieved
    function onPhotoDataSuccess(imageData) {
    //console.log(imageData);
    //Get image handle
    var picture = document.getElementById("picture");
        //Unhide image elements
        picture.style.display = "block";
        //Show the captured photo
        picture.src = "data:image/jpeg;base64," + imageData;
        return imageData;
    };
    
    //Take picture function
    function takePictureEdit() {
    //Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50, allowEdit: true, destinationType: destinationType.DATA_URL});
    };

    //Error function called if something goes wrong.
    function onFail(message) {
      alert("Failed because: " + message);
    };
    
	//Take picture click event
	$("#captureEdit").on("click", function() {
		takePictureEdit();
	});
}); //End of cameraPage pageinit

$("#contactsPage").on("pageinit", function() {
	//Search contacts function
    function onDeviceReady() {
    	//Grab search term from input field
    	var contactTerm = $("#contactTerm").val();
        var options = new ContactFindOptions();
        options.filter = contactTerm; 
        options.multiple = true;
        var fields = ["displayName", "name", "emails", "phoneNumbers"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    };

    //Display contact if successfull
    function onSuccess(contacts) {
    for (var i=0; i<contacts.length; i++) {
        //alert("First Name: "   + contacts[i].name.givenName        + "\n" + 
              //"Last Name: "    + contacts[i].name.familyName       + "\n" +
              //"Phone Number :" + contacts[i].phoneNumbers[i].value + "\n" +
              //"Email: "        + contacts[i].emails[i].value);
              //console.log(contacts);
              
        var conResults = document.getElementById("conResults");
        //$("#conResults").empty(); 
    	conResults.innerHTML = "First Name: "   + contacts[i].name.givenName        + "<br/>" + 
                               "Last Name: "    + contacts[i].name.familyName       + "<br/>" + 
                               "Phone Number: " + contacts[i].phoneNumbers[0].value + "<br/>" + 
                               "Email: "        + contacts[i].emails[0].value; 
        }     
    };
    
    //Display error message if failed
    function onError(contactError) {
        alert("Search failed");
    };
    
    //Click event and function call
    $("#contactSearch").on("click", function() {
	    onDeviceReady();
    });
}); //End of contactsPage pageinit

$("#research").on("pageinit", function() {
	//Code needed for research goes here
}); //End of research pageinit

$("#error404").on("pageinit", function() {
	//Code needed for error404 goes here
}); //End of error404 pageinit

//Global function for device info on native and in navbar
$(".device").on("click", function() {
	$.mobile.changePage($("#deviceInfo"));
	setTimeout(showDeviceInfo, 1000);
	//alert("device clicked");
});

//Device Info function, fired when "device info" is clicked
function showDeviceInfo() {
	var devInfo = document.getElementById("deviceDisplay");

    devInfo.innerHTML = "Device Name: "      + device.name     + "<br/>" + 
                        "Device Model: "     + device.model    + "<br/>" + 
                        "Device Platform: "  + device.platform + "<br/>" + 
                        "Platform Version: " + device.version  + "<br/>" + 
                        "Device UUID: "      + device.uuid     + "<br/>" +
                        "Cordova Version: "  + device.cordova  + "<br/>";
};

//Global changePage function for home button in navbar and on error404
$(".home").on("click", function() {
	$.mobile.changePage($("#index"));
});

//Geolocation function to grab current position
function showGeo() {
	var option = {enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
};
//onSuccess displays current geolocation
function onSuccess(position) {
    var currentGeo = document.getElementById("currentLoc");
    currentGeo.innerHTML = "Latitude: "          + position.coords.latitude         + "<br/>" +
                           "Longitude: "         + position.coords.longitude        + "<br/>" +
                           "Accuracy: "          + position.coords.accuracy         + "<br/>" +
                           "Altitude: "          + position.coords.altitude         + "<br/>" +
                           "Altitude Accuracy: " + position.coords.altitudeAccuracy + "<br/>" +
                           "Timestamp: "         + position.timestamp               + "<br/>";
};
//onError displays an error if something went wrong
function onError(error) {
    alert("code: "    + error.code    + "\n" + //\n stands for new line in unix?(similar br tag)
          "message: " + error.message + "\n");
};//Geolocation ends here

