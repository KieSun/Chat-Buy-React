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
