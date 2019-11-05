// Build a table and form in html
// Link firebase in JS
// Initalize firebase
// create var to reference the database

// generate the table in js

var firebaseConfig = {
    apiKey: "AIzaSyDu7eC8tWMBck2aa2PhXLvHsNiqwNbb9U4",
    authDomain: "train-schedule-9e9ef.firebaseapp.com",
    databaseURL: "https://train-schedule-9e9ef.firebaseio.com",
    projectId: "train-schedule-9e9ef",
    storageBucket: "train-schedule-9e9ef.appspot.com",
    messagingSenderId: "121908318918",
    appId: "1:121908318918:web:8272a91cc808e7a1f23dc7",
    measurementId: "G-YB4MXESPLR"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var time = "";
  var frequency = 0;


 $("#add-train-btn").on ("click", function(event){
     event.preventDefault();
     
     name = $("#name-input").val().trim();
     destination = $("#destination-input").val().trim();
     frequency = $("#frequency-input").val().trim();
     time = $("#time-input").val().trim();
     
     database.ref().push({
         name:name,
         destination:destination,
         time:time,
         frequency:frequency,
         minsAway:minsAway,
     });
 });

var count = 0;

 database.ref().on("child_added", function(childSnapshot){
    count ++;
    var minsAway = 0;
    // var time = 0;
    
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().minsAway);
    
  
    var tableData = $("<tr>")
    tableData.append($("<td>").text(childSnapshot.val().name));
    tableData.append($("<td>").text(childSnapshot.val().destination));
    tableData.append($("<td>").text(childSnapshot.val().frequency));
    tableData.append($("<td>").text(childSnapshot.val().time));
    tableData.append($("<td>").text(minsAway));
    updateTime();

    $("#data-display").append(tableData);

 },function(errorObject){
     console.log("Errors handled: " + errorObject.code);
 })

var updateTime = function(){
    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime= moment();
    console.log( moment(currentTime).format("hh:mm"))
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    var tMinutesTillTrain = frequency - tRemainder;
    console.log(tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(nextTrain)
    return nextTrain
}
