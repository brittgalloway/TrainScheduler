//firebase links
const firebaseConfig = {
  apiKey: "AIzaSyAM9lhr8g_68x5GhZqS8GnGF-JDwSwgpYc",
  authDomain: "trainschedulerweek7.firebaseapp.com",
  databaseURL: "https://trainschedulerweek7.firebaseio.com",
  projectId: "trainschedulerweek7",
  storageBucket: "",
  messagingSenderId: "683065864830",
  appId: "1:683065864830:web:85e8455ec49dff97dc1e2f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// $(document).ready(function() {
//function on "submit" click
$("#submit").on("click", function(e) {
  e.preventDefault();
  const tTitle = $("#trainName")
    .val()
    .trim();
  const dest = $("#destination")
    .val()
    .trim();
  const trainTime = $("#1stTrain")
    .val()
    .trim();
  const freq = $("#frequency")
    .val()
    .trim();
  //push to firebase
  database.ref().push({
    tTitle: tTitle,
    place: dest,
    time: trainTime,
    freqrency: freq
  });
});
//enter database info to the table
database.ref().on("child_added", function(snapshot) {
  //creating the row for teh input data
  const row = $("<tr>");
  //assigning varibles and appending to columns in a single row
  //train name
  const trainName = $("<td>");
  trainName.text(snapshot.val().tTitle);
  row.append(trainName);
  //destination
  const dest = $("<td>");
  dest.text(snapshot.val().place);
  row.append(dest);
  //frequency
  const freq = $("<td>");
  const freq1 = snapshot.val().freqrency;
  freq.text(freq1);
  row.append(freq);
  //train time value
  const trainTIme = snapshot.val().time;
  //convert train time to hours and minutes
  let timeConvert = moment(trainTIme, "HH:mm");

  //makes timeConvert in minutes
  let diffTime = moment().diff(moment(timeConvert), "minutes");
  //finds the remainder of diffTime and freq1
  let tRemainder = diffTime % freq1;
  //finds frequency - deference in time is the minutes away
  let tMinutesTillTrain = freq1 - tRemainder;
  //displays next arrival
  const nextArrive = $("<td>");
  let nextTrain = moment().add(tMinutesTillTrain, "minutes");
  nextArrive.text(moment(nextTrain).format("hh:mm"));
  row.append(nextArrive);
  //displays minutes away
  const minAway = $("<td>");
  minAway.text(tMinutesTillTrain);
  row.append(minAway);
  //adds the row to the body
  console.log(row);
  $("#tbody").append(row[0]);
});
//if able, have time away decrement every minute
//
//if that is working, make a button to clear row/table/search
//if that is working, make a button to delete row
//if that is working, make a button to edit row
// });
