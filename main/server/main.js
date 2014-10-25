var workerUrls = [
  "http://localhost:7005",
  "http://localhost:7015"
];

var workers = new Workers(workerUrls);

Meteor.methods({
  processVideo: function() {
    this.unblock();
    return workers.processVideo();
  }
});