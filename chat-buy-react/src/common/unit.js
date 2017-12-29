

Array.prototype.last = function(x) {
  return this[this.length - Math.abs(x || 1)];
};
Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
  return this;
};
