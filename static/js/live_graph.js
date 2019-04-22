var jokeArray = [];
var setIntervalFlag = true;
for (var i = 0; i < 10; i++) {
  jokeArray.push(0);
}

function loadChart() { //fetches json data & calls displayChart() to render graph every second
  var jokeData, jokeLength;
  var requestURL = 'http://api.icndb.com/jokes/random'; //Joke api endpoint
  var request = new XMLHttpRequest({
    mozSystem: true
  }); // create http request
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      jokeData = JSON.parse(request.responseText);
      jokeLength = jokeData.value.joke.length;
      // console.log(jokeLength);
      jokeArray.shift();
      jokeArray.push(jokeLength);
      displayChart(jokeArray);
    }
  };
  request.open('GET', requestURL);
  request.send();
  setIntervalOnce()
}

function setIntervalOnce(){
  if (setIntervalFlag){
    setInterval(loadChart, 1002);
    setIntervalFlag = false
  }

}

function displayChart(jokeArray) { // to be called by loadChart() to render live chart
  var ctx = document.getElementById('myGraph').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    showTooltips: false,
    events: ['click'],
    data: {
      labels: ['-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0'],
      datasets: [{
        label: 'Joke length',
        data: jokeArray,
        backgroundColor: "rgba(153,255,51,0.4)"
      }]
    }

  });
}
