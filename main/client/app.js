var jobNumber = 0;

Template.main.events({
  "click #processVideo": function() {
    var jobId = ++jobNumber;
    printMessage(jobId, "processing");
    Meteor.call('processVideo', function(err, result) {
      if(err) {
        printMessage(jobId, "error processing: " + err.message);
      } else {
        printMessage(jobId, "processed: " +  JSON.stringify(result));
      }
    });
  }
});

Template.main.rendered = function() {
  $('#result').text("\n# Results\n")
};

printMessage = function(jobId, message) {
  message = "[jobId: " + jobId + "] " + message;
  var existing = $('#result').text();
  existing = existing + '\n' + message;
  $('#result').text(existing);
}