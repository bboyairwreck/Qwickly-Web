var qFirebase = new Firebase("https://qwickly.firebaseio.com/");

$(document).ready(function() {
	console.log("running");

	var gameFirebase = qFirebase.child("games").child("FOOD");
	var playersFirebase = gameFirebase.child("players");

	gameFirebase.child("round1").remove();

	gameFirebase.child("round1").limitToLast(1).on("child_added", function(snapsnot, prevChildKey) {
		console.log("child_added : " + snapsnot.val());
		var playerID = snapsnot.val();

		playersFirebase.child(playerID).once("value", function(data) {
			var playerName = data.val();
			console.log("playerName : " + playerName);
			hitList(playerName);
		});
		
		
	});

	function hitList(name) {
		$bamList = $("#bamList");

		$li = $("<li>");
		$li.text(name);

		$bamList.append($li);
	}
});