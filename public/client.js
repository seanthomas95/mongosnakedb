
//console.log('Client.js running\n--');

var count = 0;

var exportScore = 0;



var downloadName;
var downloadScore;


while (count = 0) {
	button = document.getElementById('scoreBox').value;
	console.log('Button:' + score);
}

// const button = document.getElementById('myButton');
// 	button.addEventListener('click', function(e) {
// 	console.log('logging score...');
// });

function gameEnded() {

	exportScore = Math.round(score);

	// Pass 'person' to server.js
	// Pass 'exportScore' to server.js

	fetch('/gameEnd', {
	    method: 'PUT',
	    body: JSON.stringify({username: person, score: exportScore}),
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json'
	    }
  	})
    .then(function(response) {
      if(response.ok) {
        console.log('%c Scoreboard Updated ', 'background: red; color: white');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });

}


function getHighScore() {
	  fetch('/score', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      console.log(data);
      downloadScore = data[0].score;
      console.log("Highscore (from db): " + downloadScore);
    })
    .catch(function(error) {
      console.log(error);
    });
}