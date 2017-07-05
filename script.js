// Play counter variable
var playCount = 0;

// Played moves arrays
var blackPlays = [];
var redPlays = [];

// Potential moves array
var moves = [[1,8,15,22,29,36], [2,9,16,23,30,37], [3,10,17,24,31,38], [4,11,18,25,32,39], [5,12,19,26,33,40], [6,13,20,27,34,41], [7,14,21,28,35,42]];

// On click event for move
$(".circle").click(function() {
  // Column number of clicked element ie index of array in moves
  var col = moves[$(this).attr("class").toString()[7]];

  // ID of next available move for clicked column
  var id = col.shift();

  // If play count is even
  if (playCount % 2 === 0) {
    // Turn lowest spot black
    $("#" + id).css("background-color", "black");
  } else {
    // Turn lowest spot red
    $("#" + id).css("background-color", "red");
  }
  playCount++;
});

// On click for start over button
$("#reset").click(function() {
  // Reset play counter
  playCount = 0;
  // Reset played moves arrays
  blackPlays = [];
  redPlays = [];
  // Reset potential moves array
  moves = [[1,8,15,22,29,36], [2,9,16,23,30,37], [3,10,17,24,31,38], [4,11,18,25,32,39], [5,12,19,26,33,40], [6,13,20,27,34,41], [7,14,21,28,35,42]];
  // Reset board
  $(".circle").css("background-color", "white");
});