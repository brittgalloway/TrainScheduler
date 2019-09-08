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

$(document).ready(function() {
  //clear table, to not make duplicates
  $("#tbody").empty();
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
  database.ref().on("child_added", function(snapshot) {
    //enter database info to the table
    const row = $("<tr>");
    //assigning varibles and appending to columns in a single row
    const trainName = $("<td>");
    trainName.text(snapshot.val().tTitle);
    row.append(trainName);
    const dest = $("<td>");
    dest.text(snapshot.val().place);
    row.append(dest);
    const freq = $("<td>");
    const freq1 = snapshot.val().freqrency;

    freq.text(freq1);
    row.append(freq);
    const trainTIme = snapshot.val().time;

    let firstTimeConverted = moment(trainTIme, "HH:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    let tRemainder = diffTime % freq1;
    console.log(tRemainder);

    let tMinutesTillTrain = freq1 - tRemainder;
    row.append("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    row.append(moment(nextTrain).format("hh:mm"));
    // const freqMin = moment().minute(freq);
    // console.log(freqMin);
    // moment().get("minute");
    // moment().add(Duration);
    // const monthsHolder = $("<td>");
    // const duration = moment.duration(freq, "minutes");
    // const arrival = parseInt(duration.asMinutes());

    // const arrival = time - freqMin;
    // row.append(arrival);

    // const minLeft = time - freq;
    // row.append(minLeft);
    //append rows to table body
    $("tbody").append(row);
  });
  //
  //function to calculate time away
  //use First Train (military time) and Frequency (minutes) in the form (might need to convert units)to find next arrival time
  //use next next arrival time and current time (moment()) to find time away
  //if able, have time away decrement every minute
  //
  //if that is working, make a button to clear row/table/search
  //if that is working, make a button to delete row
  //if that is working, make a button to edit row
});
