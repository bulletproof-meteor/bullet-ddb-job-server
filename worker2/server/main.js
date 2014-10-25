Meteor.methods({
  "processVideo": function() {
    console.log("processing video for 2 seconds");
    Meteor._sleepForMs(2000);
    return {done: true};
  }
});