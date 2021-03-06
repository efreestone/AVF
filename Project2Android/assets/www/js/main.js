/*
Elijah Freestone
AVF 1304
Project 2 Android
4-13-13
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
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


$("#index").on("pageinit", function() {

	//Changepage function for api button
	$("#seeAPI").on("click", function() {
		$.mobile.changePage($("#api"));
	});
	
	//Changepage function for native button
	$("#seeNative").on("click", function() {
		$.mobile.changePage($("#native"));
	});
	
	//Changepage function for research button
	$("#seeResearch").on("click", function() {
		$.mobile.changePage($("#research"));
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
                            .attr("class", "tweet"))
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
				dataType: "jsonp", //this was set to json in my phone demo. Works in emulator as jsonp though.
				//jsonp: "jsoncallback",
				url: "http://search.twitter.com/search.json?",
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
                            .attr("class", "tweet"))
                            .append($("<h4>" + this.created_at + "</h4>"))
                        );
                    });
				}
			});
		};
	});
}); //End of twitter pageinit

$("#native").on("pageinit", function() {
	//Code needed for native goes here
}); //End of native pageinit

$("#research").on("pageinit", function() {
	//week 1 changePage
	$("#week1Btn").on("click", function() {
		$.mobile.changePage($("#week1"));
	});
	//week 2 changePage
	$("#week2Btn").on("click", function() {
		$.mobile.changePage($("#week2"));
	});
	//week 3 changePage
	$("#week3Btn").on("click", function() {
		$.mobile.changePage($("#week3"));
	});
	//week 4 changePage
	$("#week4Btn").on("click", function() {
		$.mobile.changePage($("#week4"));
	});
}); //End of research pageinit

$("#error404").on("pageinit", function() {
	//Code needed for error404 goes here
}); //End of error404 pageinit

//changePage function to error404 for all buttons with class="error"
$(".error").on("click", function() {
	$.mobile.changePage($("#error404"));
});

//changePage function for return to research button on week1-4
$(".rtnResearch").on("click", function() {
	$.mobile.changePage($("#research"));
});

//changePage function for return to api buttons on facebook and twitter
$(".api").on("click", function() {
	$.mobile.changePage($("#api"));
});

//changePage function for home buttons on navbar and error404
$(".home").on("click", function() {
	$.mobile.changePage($("#index"));
});