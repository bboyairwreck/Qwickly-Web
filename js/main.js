var qFirebase = new Firebase("https://qwickly.firebaseio.com/");
var gameFirebase = qFirebase.child("games").child("FOOD");
var playersFirebase = gameFirebase.child("players");

var isPlaying = false;

$(document).ready(function() {
	console.log("running");

	gameFirebase.child("round1").remove();

	listenForWinner();

	gameFirebase.child("round1").on("child_added", function(snapsnot, prevChildKey) {
		console.log("child_added : " + snapsnot.val());
		var playerID = snapsnot.val();

		playersFirebase.child(playerID).once("value", function(data) {
			var playerName = data.val();
			console.log("playerName : " + playerName);

			if (isPlaying) {
				console.log("found winner");
				isPlaying = false;
				showWinner(playerName);
			}

			hitList(playerName);
		});
	});

});


function hitList(name) {
	$bamList = $("#bamList");

	$li = $("<li>");
	$li.text(name);

	$bamList.append($li);
}

function listenForWinner() {
	$("#btnListen").click(function(event) {
		isPlaying = true;
		$("#winner").text("");
		gameFirebase.child("round1").remove();
		$bamList = $("#bamList").html("");
		$(this).text("Reset");
	});
}

function showWinner(displayName) {
	$("#winner").text(displayName + " is the winner!!");
}