Workers = function (workers) {
  var self = this;
  this.workers = [];

  workers.forEach(function(url) {
    var worker = DDP.connect(url);
    Tracker.autorun(function() {
      var status = worker.status();
      if(status.connected) {
        console.log("worker connected: " + url);
        self.workers.push(worker);
      } else {
        var index = self.workers.indexOf(worker);
        if(index >= 0) {
          console.log("worker disconnected: " + url);
          self.workers.splice(index, 1);
        }
      }
    });
  });

  this._nextWorker = 0;
}

Workers.prototype.getNextWorker = function() {
  if(this.workers.length == 0) {
    return null;
  }

  if(this._nextWorker >= this.workers.length) {
    this._nextWorker = 0;
  }

  var worker = this.workers[this._nextWorker++];
  return worker;
};

Workers.prototype.processVideo = function(args) {
  args = _.toArray(arguments);
  args.unshift('processVideo');
  var worker = this.getNextWorker();
  if(worker) {
    return worker.call.apply(worker, args);
  } else {
    throw new Meteor.Error(500, "no worker to process");
  }
};