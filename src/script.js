// Play counter variable
var playCount = 0;

// Played moves arrays
var blackPlays = [];
var redPlays = [];

// Potential moves array
var moves = [[1,8,15,22,29,36], [2,9,16,23,30,37], [3,10,17,24,31,38], [4,11,18,25,32,39], [5,12,19,26,33,40], [6,13,20,27,34,41], [7,14,21,28,35,42]];

// Board color variable
var boardColor = "traditional";

// On click for color scheme button
$("#scheme").click(function() {
  if (boardColor === "traditional") {
    $("#board").css("background-color", "blue");
    $("#scheme").html("Modern");
    boardColor = "modern"
  } else {
    $("#board").css("background-color", "yellow");
    $("#scheme").html("Traditional");
    boardColor = "traditional";
  }
});

// Sorting and splicing function for algorithm
var sortArr = function(arr, index) {
  // Remove current value at passed in index from passed in array
  arr.splice(index, 1);
  // Return new array sorted from smallest to largest
  return arr.sort(function(a, b) {
    return a - b;
  });
}

// Recursive function to check for horizontal connect 4
var isHorizontal = function(arr, val, connects) {
  if (connects > 3) {
    return true;
  }
  for (var i = 0; i < arr.length; i++) {
    var current = arr[i];
    if (current === val + 1) {
      var shortened = sortArr(arr, i);
      return isHorizontal(shortened, current, connects + 1);
    }
  }
  return false;
}

// Recursive function to check for vertical connect 4
var isVertical = function(arr, val, connects) {
  if (connects > 3) {
    return true;
  }
  for (var i = 0; i < arr.length; i++) {
    var current = arr[i];
    if (current === val + 7) {
      var shortened = sortArr(arr, i);
      return isVertical(shortened, current, connects + 1);
    }
  }
  return false;
}

// Recursive function to check for diagonal left connect 4
var isDiagLeft = function(arr, val, connects) {
  if (connects > 3) {
    return true;
  }
  for (var i = 0; i < arr.length; i++) {
    var current = arr[i];
    if (current === val + 6) {
      var shortened = sortArr(arr, i);
      return isDiagLeft(shortened, current, connects + 1);
    }
  }
  return false;
}

// Recursive function to check for diagonal right connect 4
var isDiagRight = function(arr, val, connects) {
  if (connects > 3) {
    return true;
  }
  for (var i = 0; i < arr.length; i++) {
    var current = arr[i];
    if (current === val + 8) {
      var shortened = sortArr(arr, i);
      return isDiagRight(shortened, current, connects + 1);
    }
  }
  return false;
}

// On click event for move
$(".circle").click(function() {
  // Column number of clicked element ie index of array in moves
  var col = moves[$(this).attr("class").toString()[7]];

  // ID of next available move for clicked column
  var id = col.shift();

  // If play count is even
  if (playCount % 2 === 0) {
    // If board color is traditional
    if (boardColor === "modern") {
      // Turn lowest spot yellow
      $("#" + id).css("background-color", "yellow");
      blackPlays.push(id);
    } else {
      // Otherwise turn lowest spot black
      $("#" + id).css("background-color", "black");
      blackPlays.push(id);
    }
  } else {
    // Turn lowest spot red
    $("#" + id).css("background-color", "red");
    redPlays.push(id);
  }
  playCount++;

  // If playCount is greater than 7 check to see if there is a winner
  if (playCount > 6) {
    // If playCount is odd check redPlays
    if (playCount % 2 === 0) {
      // Sort redPlays from smallest to largest
      var sortedRed = redPlays.sort(function(a, b) {
        return a - b;
      });
      // Check sortedRed for horizontal connect 4
      for (var i = 0; i < sortedRed.length; i++) {
        var redCopy = sortedRed.slice();
        if (isHorizontal(redCopy, redCopy[i], 1) || isVertical(redCopy, redCopy[i], 1) || isDiagLeft(redCopy, redCopy[i], 1) || isDiagRight(redCopy, redCopy[i], 1)) {
          $("#board").fadeOut();
          $("#board").css("background-color", "white");
          $("#board").css("color", "red");
          $("#board").css("text-align", "center");
          $("#board").html("Connect 4! Red wins!");
          $("#board").fadeIn();
        }
      }

    } // If playCount is even check blackPlays
    else {
      // Sort blackPlays from smallest to largest
      var sortedBlack = blackPlays.sort(function(a, b) {
        return a - b;
      });
      // Check sortedBlack for horizontal connect 4
      for (var j = 0; j < sortedBlack.length; j++) {
        var blackCopy = sortedBlack.slice();
        if (isHorizontal(blackCopy, blackCopy[j], 1) || isVertical(blackCopy, blackCopy[j], 1) || isDiagLeft(blackCopy, blackCopy[j], 1) || isDiagRight(blackCopy, blackCopy[j], 1)) {
          if (boardColor === "modern") {
            $("#board").fadeOut();
            $("#board").css("background-color", "white");
            $("#board").css("color", "yellow");
            $("#board").css("text-align", "center");
            $("#board").html("Connect 4! Yellow wins!");
            $("#board").fadeIn();
          } else {
            $("#board").fadeOut();
            $("#board").css("background-color", "white");
            $("#board").css("text-align", "center");
            $("#board").html("Connect 4! Black wins!");
            $("#board").fadeIn();
          }
        }
      }
    }
  }
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

// export { isHorizontal };

