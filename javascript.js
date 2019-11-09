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
 
 $("#add-train-btn").on ("click", function(event){
     event.preventDefault();
     if($("#validation")[0].reportValidity()){
     
     var name = $("#name-input").val().trim();
     var destination = $("#destination-input").val().trim();
     var frequency = $("#frequency-input").val().trim();
     var time = $("#time-input").val().trim();

     
     database.ref().push({
         name:name,
         destination:destination,
         time:time,
         frequency:frequency,
       
     });
    
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
    };
     
 });


var count = 0;

 database.ref().on("child_added", function(childSnapshot){
    count ++;
    var minsAway = 0;

    var firstTimeConverted = moment(childSnapshot.val().time, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = diffTime % childSnapshot.val().frequency;
    var minsAway = childSnapshot.val().frequency - remainder;
    var nextTrain = moment().add(minsAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm A");

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);
    
    var tableData = $("<tr>")
    tableData.append($("<td>").text(childSnapshot.val().name));
    tableData.append($("<td>").text(childSnapshot.val().destination));
    tableData.append($("<td>").text(childSnapshot.val().frequency));
    tableData.append($("<td>").text(nextTrain));
    tableData.append($("<td>").text(minsAway));

    $("#data-display").append(tableData);

 },function(errorObject){
     console.log("Errors handled: " + errorObject.code);
 })

