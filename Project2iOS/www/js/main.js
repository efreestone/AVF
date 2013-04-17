/*
Elijah Freestone
AVF 1304
Project 2 iOS
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
	
	//Changepage function for api button
	$("#googleBtn").on("click", function() {
		$.mobile.changePage($("#google"));
	});

	//Changepage function for twitter button
	$("#twitterBtn").on("click", function() {
		$.mobile.changePage($("#twitter"));
	});
	
}); //End of api pageinit

$("#google").on("pageinit", function() {
	//Code needed for google goes here
}); //End of google pageinit

$("#twitter").on("pageinit", function() {
	//Twitter search API function
	$("#twitterSearch").on("click", function() {
		$("#twitResults").html("");
		var twitTerm = $("#twitTerm").val();
			console.log($("#twitTerm").val());
		$("#twitResults").empty(); 

		
		$.ajax({
			type: "GET'",
			dataType: "jsonp",
			url: "http://search.twitter.com/search.json?",
			data:{q: twitTerm},
			success: function(data){
			console.log(data);
				$.each(data.results, function(){
					$("#twitResults").append($("<div>")
							.attr("class", "results")
                            .append($("<h1>" + "Username: " + "@" + this.from_user + "</h1>")
                            .attr("class", "user"))
                            .append($("<img src=" + this.profile_image_url + ">"))
                            .append($("<h2>" + this.from_user_name + "</h2>"))
                            .append($("<h3>" + this.text + "</h3>")
                            .attr("class", "tweet"))
                            .append($("<h4>" + this.created_at + "</h4>")
                            .attr("class", "time"))
                    );
					
				});
			}
		});
	});
}); //End of twitter pageinit

$("#native").on("pageinit", function() {
	//Code needed for native goes here
}); //End of native pageinit

$("#research").on("pageinit", function() {
	//Code needed for research goes here
}); //End of research pageinit

$("#error404").on("pageinit", function() {
	//Code needed for error404 goes here
}); //End of error404 pageinit

//Global function for device info on native and in navbar
$(".device").on("click", function() {
	//device function will go here
	//alert("device clicked");
});

//Global changePage function for home button in navbar and on error404
$(".home").on("click", function() {
	$.mobile.changePage($("#index"));
});
		