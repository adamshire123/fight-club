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
      if (this.opponent_1 === this.opponent_2) {
         contestResults = 'tie'
       } else if (md5(this.opponent_1) > md5(this.opponent_2)) {
         contestResults = {'winner':this.opponent_1, 'loser':this.opponent_2}
       } else {
         contestResults = {'winner':this.opponent_2, 'loser':this.opponent_1}
       }
       return contestResults;
    }

  }



//TODO: Make sure we have two opponents
const checkOpponents = () => {

}
//TODO: listen for data changes in the database




const fight = () => {
  //create a new contest object
  const contest = new Contest(document.getElementById('opponent_1').value, document.getElementById('opponent_2').value)
  //make sure we have two opponents
  if (!!(contest.opponent_1) && !!(contest.opponent_2)) {
    let contestResults = contest.getResults(); // return a winner and loser
    //If there's a tie don't save anything to the database. Just display a message.
    if (contestResults === 'tie'){
      alert("it's a tie");
      return false;
    }
  console.log(contestResults);
  // Get a database reference
  const contestsRef = firebase.database().ref('contests/');

  //write the contest to the database
  let contestKey = contestsRef.push(contestResults).key;

  //get the contest from the datatabase and update UI
  let resultsRef = firebase.database().ref('contests/').limitToLast(1);
  let resultsList =""
   resultsRef.once('value', function(snapshot) {

            snapshot.forEach (function(childSnapshot) {

              resultsList += "<div> winner : " + childSnapshot.val().winner + "</div>"
            document.getElementById('results').innerHTML = resultsList })
          }
     );

  } else {
    alert('we need two opponents')
    }
}
