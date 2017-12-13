import { Map } from "immutable";
export function changeOrderState(orders, id, state) {
  return orders.update(orders.findIndex(v => v._id === id), order =>
    Map(order)
      .set("state", 2)
      .toObject()
  );
}
