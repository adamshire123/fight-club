


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

function Contest(opponent_1, opponent_2)  {
    this.opponent_1 = opponent_1;
    this.opponent_2 = opponent_2;
    this.getResults = function() {
      let contestResults;
      let timestamp = firebase.database.ServerValue.TIMESTAMP
      if (this.opponent_1 === this.opponent_2) {
         return contestResults = 'tie'
       }

       md5(this.opponent_1) > md5(this.opponent_2) ? contestResults = {'winner':this.opponent_1, 'loser':this.opponent_2, 'timestamp':timestamp} : contestResults = {'winner':this.opponent_2, 'loser':this.opponent_1,'timestamp':timestamp};
       return contestResults;
    }

  }




const main = () => {
  //shortcuts to DOM Elements
  var opponent_1 = document.getElementById('opponent_1').value
  var opponent_2 = document.getElementById('opponent_2').value
  var resultsDiv = document.getElementById('results')
  //make sure we have two opponents
  if (!(opponent_1) || !(opponent_2)) {
    alert("we need two opponents")
    return false;
  }

    //Get contest results
    const contestResults = new Contest(opponent_1, opponent_2).getResults()

    if (contestResults === 'tie'){
      alert("it's a tie");
      return false;
      } else {

        // Get a database reference
        const contestsRef = firebase.database().ref('contests/');

        //write the contest to the database

        contestsRef.push(contestResults);

        //get the contest from the datatabase and update UI
        let resultsRef = firebase.database().ref('contests/').orderByChild('timestamp');
        let resultsList =""
        resultsRef.once('value').then(function(snapshot) {
                                snapshot.forEach (function(childSnapshot) {
                                          var data = childSnapshot.val();
                                          var timestamp = data.timestamp
                                          var winner = data.winner.replace(/(<([^>]+)>)/ig,"");

                                          resultsList += "<div>timestamp: "+ timestamp + " winner: " + winner + "</div>"
                                          resultsDiv.innerHTML = resultsList;
                                });
         });
       }
}
