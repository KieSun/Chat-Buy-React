import React from "react";
import List from "../components/allOrders/list";
import AnimationContainer from './animation'

const AllOrders = () => (
  <div className="list">
    <List />
  </div>
);

export default AnimationContainer(AllOrders);
