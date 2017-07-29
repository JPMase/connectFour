var assert = chai.assert;
// import { isHorizontal } from '../src/script.js';

var sortArr = function(arr, index) {
  arr.splice(index, 1);
  return arr.sort(function(a, b) {
    return a - b;
  });
}

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

var moves = [[1,8,15,22,29,36], [2,9,16,23,30,37], [3,10,17,24,31,38], [4,11,18,25,32,39], [5,12,19,26,33,40], [6,13,20,27,34,41], [7,14,21,28,35,42]];

var playCount = 0;
var colCount = 0;
var checkedRed;
var checkedBlack;

var redPlays = [];
var blackPlays = [];

// Move function
var played = function() {
  checkedRed = false;
  checkedBlack = false;
  if (colCount === 7) {
    colCount = 0;
  }
  // Column number of clicked element ie index of array in moves
  // var col = moves[$(this).attr("class").toString()[7]];

  // ID of next available move for clicked column
  // var id = col.shift();

  // If play count is even
  if (playCount % 2 === 0) {
    // If board color is traditional
    // if (boardColor === "modern") {
      // Turn lowest spot yellow
      // $("#" + id).css("background-color", "yellow");
      blackPlays.push(moves[colCount].shift());
    // } else {
      // Otherwise turn lowest spot black
      // $("#" + id).css("background-color", "black");
      // blackPlays.push(moves[colCount][rowCount]);
    // }
  } else {
    // Turn lowest spot red
    // $("#" + id).css("background-color", "red");
    redPlays.push(moves[colCount].shift());
  }
  playCount++;
  colCount++;

  // If playCount is greater than 7 check to see if there is a winner
  if (playCount > 6) {
    // If playCount is odd check redPlays
    if (playCount % 2 === 0) {
      checkedRed = true;
      // Sort redPlays from smallest to largest
      var sortedRed = redPlays.sort(function(a, b) {
        return a - b;
      });
      // Check sortedRed for horizontal connect 4
      for (var i = 0; i < sortedRed.length; i++) {
        var redCopy = sortedRed.slice();
        if (isHorizontal(redCopy, redCopy[i], 1) || isVertical(redCopy, redCopy[i], 1) || isDiagLeft(redCopy, redCopy[i], 1) || isDiagRight(redCopy, redCopy[i], 1)) {
          // $("#board").fadeOut();
          // $("#board").css("background-color", "white");
          // $("#board").css("color", "red");
          // $("#board").css("text-align", "center");
          // $("#board").html("Connect 4! Red wins!");
          // $("#board").fadeIn();
        }
      }

    } // If playCount is even check blackPlays
    else {
      checkedBlack = true;
      // Sort blackPlays from smallest to largest
      var sortedBlack = blackPlays.sort(function(a, b) {
        return a - b;
      });
      // Check sortedBlack for horizontal connect 4
      for (var j = 0; j < sortedBlack.length; j++) {
        var blackCopy = sortedBlack.slice();
        if (isHorizontal(blackCopy, blackCopy[j], 1) || isVertical(blackCopy, blackCopy[j], 1) || isDiagLeft(blackCopy, blackCopy[j], 1) || isDiagRight(blackCopy, blackCopy[j], 1)) {
          // if (boardColor === "modern") {
          //   $("#board").fadeOut();
          //   $("#board").css("background-color", "white");
          //   $("#board").css("color", "yellow");
          //   $("#board").css("text-align", "center");
          //   $("#board").html("Connect 4! Yellow wins!");
          //   $("#board").fadeIn();
          // } else {
          //   $("#board").fadeOut();
          //   $("#board").css("background-color", "white");
          //   $("#board").css("text-align", "center");
          //   $("#board").html("Connect 4! Black wins!");
          //   $("#board").fadeIn();
          // }
        }
      }
    }
  }
}

var reset = function() {
  // Reset play counter
  playCount = 0;
  // Reset played moves arrays
  blackPlays = [];
  redPlays = [];
  // Reset potential moves array
  moves = [[1,8,15,22,29,36], [2,9,16,23,30,37], [3,10,17,24,31,38], [4,11,18,25,32,39], [5,12,19,26,33,40], [6,13,20,27,34,41], [7,14,21,28,35,42]];
  // Reset board
  // $(".circle").css("background-color", "white");
  colCount = 0;
  rowCount = 0;
};

describe('Buttons', function() {
  it('Should change board colors', function() {
    boardColor = "modern";
    var clicked = function() {
    if (boardColor === "traditional") {
      document.getElementById("board").css.style.backgroundColor = "blue";
      document.getElementById("scheme").innerHTML("Modern");
      boardColor = "modern"
    } else {
      document.getElementById("board").css.style.backgroundColor = "yellow";
      document.getElementById("scheme").innerHTML("Traditional");
      boardColor = "traditional";
    }

    clicked();
    assert.equal(document.getElementById("board").css.style.backgroundColor, "blue");
    clicked();
    assert.equal(document.getElementById("board").css.style.backgroundColor, "yellow");
}
  });

  // it('Should change button text', function() {
  //   boardColor = "modern";
  //   var clicked = function() {
  //   if (boardColor === "traditional") {
  //     document.getElementById("board").css.style.backgroundColor = "blue";
  //     document.getElementById("scheme").innerHTML("Modern");
  //     boardColor = "modern"
  //   } else {
  //     // document.getElementById("board").css.style.backgroundColor = "yellow";
  //     // document.getElementById("scheme").innerHTML("Traditional");
  //     boardColor = "traditional";
  //     }
  //   }

  //   clicked();
  //   assert.equal(document.getElementById("scheme").innerHTML, "Modern");
  //   clicked();
  //   assert.equal(document.getElementById("scheme").innerHTML, "Traditional");
  // });

  it('Should reset play count', function() {
    played();

    assert.equal(playCount, 1);

    played();

    assert.equal(playCount, 2);

    reset();

    assert.equal(playCount, 0);
  });

  it('Should reset red and black plays', function() {
    played();

    assert.equal(blackPlays.length, 1);
    assert.equal(blackPlays[0], 1);

    played();

    assert.equal(redPlays.length, 1);
    assert.equal(redPlays[0], 2);

    reset();

    assert.equal(blackPlays.length, 0);
    assert.equal(redPlays.length, 0);
  });

  it('Should reset potential plays', function() {
    played();

    assert.equal(moves[0].length, 5)

    played();

    assert.equal(moves[1].length, 5);

    reset();

    assert.equal(moves[0].length, 6);
    assert.equal(moves[0][0], 1);
    assert.equal(moves[1].length, 6);
    assert.equal(moves[1][0], 2);
  });
});

describe('Algorithms', function() {
  it('Should sort and shorten passed in arrays', function() {
    var unsorted = [5,4,1,3,2];
    var sorted = sortArr(unsorted, 0);

    assert.equal(sorted.length, 4);
    assert.equal(sorted[0] < sorted[1], true);
    assert.equal(sorted[1] < sorted[2], true);
    assert.equal(sorted[2] < sorted[3], true);
  });

  it('Should find horizontal connect 4s', function() {
    var horiz = [1,2,3,4];
    var vert = [1,8,15,22]

    var horizConnect = isHorizontal(horiz, horiz[0], 1);
    var vertConnect = isHorizontal(vert, vert[0], 1);

    assert.equal(horizConnect, true);
    assert.equal(vertConnect, false);
  });

  it('Should find vertical connect 4s', function() {
    var horiz = [1,2,3,4];
    var vert = [1,8,15,22]

    var horizConnect = isVertical(horiz, horiz[0], 1);
    var vertConnect = isVertical(vert, vert[0], 1);

    assert.equal(horizConnect, false);
    assert.equal(vertConnect, true);
  });

  it('Should find diagonal left connect 4s', function() {
    var diagLeft = [4,10,16,22];
    var diagRight = [1,9,17,25];

    var leftConnect = isDiagLeft(diagLeft, diagLeft[0], 1);
    var rightConnect = isDiagLeft(diagRight, diagRight[0], 1);

    assert.equal(leftConnect, true);
    assert.equal(rightConnect, false);
  });

  it('Should find diagonal right connect 4s', function() {
    var diagLeft = [4,10,16,22];
    var diagRight = [1,9,17,25];

    var leftConnect = isDiagRight(diagLeft, diagLeft[0], 1);
    var rightConnect = isDiagRight(diagRight, diagRight[0], 1);

    assert.equal(leftConnect, false);
    assert.equal(rightConnect, true);
  });
});

describe('Moves', function() {
  it('Should have 42 possible moves', function() {
    var totalMoves = 0;
    for (var i = 0; i < moves.length; i++) {
      var row = moves[i];
      totalMoves += row.length;
    }

    assert.equal(totalMoves, 42);
  });

  // it('Should change colors on moves');

  it('Should increase play counter on moves', function() {
    reset();
    played();
    played();

    assert.equal(playCount, 2);
  });

  it('Should store red moves on red plays', function() {
    reset();
    played();
    played();
    played();
    played();

    assert.equal(redPlays.length, 2);
    assert.equal(redPlays[1], 4);
  });

  it('Should store black moves on black plays', function() {
    reset();
    played();
    played();
    played();
    played();

    assert.equal(blackPlays.length, 2);
    assert.equal(blackPlays[1], 3);
  });

  it('Should check for winners after 7 moves', function() {
    reset();
    played();
    played();
    played();
    played();
    played();
    played();
    played();

    assert.equal(checkedBlack, true);
  });

  it('Should check for only red winners on even moves', function() {
    reset();
    played();
    played();
    played();
    played();
    played();
    played();
    played();
    played();

    assert.equal(checkedRed, true);
    assert.equal(checkedBlack, false);
  });

  it('Should check for only black winners on odd moves', function() {
    reset();
    played();
    played();
    played();
    played();
    played();
    played();
    played();
    played();
    played();

    assert.equal(checkedRed, false);
    assert.equal(checkedBlack, true);
  });
});