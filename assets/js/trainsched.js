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
  //program
  //function
  //clear table, to not make duplicates
  //on "submit" click
  //enter form info to form
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
