import { Map } from "immutable";
export function changeOrderState(orders, id, state, userId) {
  return orders.update(orders.findIndex(v => v._id === id), order => {
    if (userId) {
      return Map(order)
        .set("state", state)
        .set("deliver", userId)
        .toObject();
    } else {
      return Map(order)
        .set("state", state)
        .toObject();
    }
  });
}

Array.prototype.last = function(x) {
  return this[this.length - Math.abs(x || 1)];
};
Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
  return this;
};
