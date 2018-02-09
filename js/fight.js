


// create a contest. Takes two opponents as input. Returns winner and loser

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDcJlrD52RBfaTEu7uBaP5L65mEvPVP_S4",
  authDomain: "fight-club-9c546.firebaseapp.com",
  databaseURL: "https://fight-club-9c546.firebaseio.com",
  projectId: "fight-club-9c546",
  storageBucket: "fight-club-9c546.appspot.com",
  messagingSenderId: "292548148013"
};
firebase.initializeApp(config);

function getContestResults(opponent_1, opponent_2)  {

    let timestamp = firebase.database.ServerValue.TIMESTAMP;
    var results;
    if (md5(opponent_1.value) > md5(opponent_2.value))  {

    //  opponent_1.classList.add("winner");
    var  contestResults =  {
                'winner':opponent_1.value,
                'loser':opponent_2.value,
                'timestamp':timestamp
              };
    } else {
      //opponent_2.classList.add("winner");
      contestResults =  {
                'winner':opponent_2.value,
                'loser':opponent_1.value,
                'timestamp':timestamp
                };

    }
      return contestResults;
}

function checkOpponents(opponent_1, opponent_2)
{
  if (!opponent_1.value || !opponent_2.value) { //require two opponents
    alert("we need two opponents")
    return false;
  } else if (opponent_1.value === opponent_2.value) {  // if it's a tie don't save it to the database
      alert("it's a tie")
    return false;
  } else {
    return true;
  }
}

function main() {
  //shortcuts to DOM Elements
  var opponent_1 = document.getElementById('opponent_1')
  var opponent_2 = document.getElementById('opponent_2')

// before we go any furtner, make sure we have two different opponents
  if (!checkOpponents(opponent_1,opponent_2)) {
    return false;
  }

    //Get contest results
    contestResults = getContestResults(opponent_1, opponent_2)
    const contestsRef = firebase.database().ref(); // get a ref to the database
    contestsRef.push(contestResults); // push contest results to the database
    showResults();
    opponent_1.value = "";
    opponent_2.value = "";
    opponent_1.focus()

}
    //set up listener to display results
    function showResults() {
      const resultsDiv = document.getElementById('results')

      let resultsRef = firebase.database().ref().limitToLast(5);
        let resultsList =""
        resultsRef.once('value', function(snapShot) {
          console.log(snapShot)
          snapShot.forEach (function(data){


          var contest = data.val()
          var timestamp = contest.timestamp
          var winner = contest.winner.replace(/(<([^>]+)>)/ig,"");
          var loser = contest.loser.replace(/(<([^>]+)>)/ig,"");
          resultsList = "<div>" + winner + " is better than " + loser + "</div>" + resultsList
          resultsDiv.innerHTML = resultsList;
            });
        });


  }
