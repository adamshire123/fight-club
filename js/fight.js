




// reate a contest. Takes two opponents as input. Returns winner and loser

class Contest {
  constructor(opponent_1, opponent_2) {
    this.opponent_1 = opponent_1;
    this.opponent_2 = opponent_2;
  }
  getResults() {
    let results;
    if (this.opponent_1 === this.opponent_2) {
       results = 'tie'
     } else if (md5(this.opponent_1) > md5(this.opponent_2)) {
       results = {'winner':this.opponent_1, 'loser':this.opponent_2}
     } else {
       results = {'winner':this.opponent_2, 'loser':this.opponent_1}
     }
     return results;
  }

 }

//TODO: Make sure we have two opponents
const checkOpponents = () => {

}

const fight = () => {
  const contest = new Contest(document.getElementById('opponent_1').value, document.getElementById('opponent_2').value)
  if (contest.opponent_1 && contest.opponent_2) {
    console.log(contest.getResults())
    //a contest entry
    let contestData = contest.getResults();
    //If there's a tie don't save anything to the database. Just display a message.
    if (contestData === 'tie'){
      return false;
    
      //TODO: display a message about it being a tie
      }

  // Get a key for a new contest.
  let newContestKey = firebase.database().ref().child('contests').push().key;

  //write the contest to the contest list
  var updates = {};
  updates['/contests/' + newContestKey] = contestData;

  return firebase.database().ref().update(updates);
  } else {
  alert('we need two opponents')
  }
}
