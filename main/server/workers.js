Workers = function (workers) {
  var self = this;
  this.workers = [];

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
  args = _.toArray(args);
  args.unshift('processVideo');
  var worker = this.getNextWorker();
  if(worker) {
    return worker.call.apply(worker, args);
  } else {
    throw new Meteor.Error(500, "no worker to process");
  }
};