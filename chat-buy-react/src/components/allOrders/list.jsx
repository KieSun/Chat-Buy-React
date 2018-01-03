import React from "react";
import MyOrderItem from "../myOrder/myOrderItem";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

const List = ({allOrders, getOrder}) => (
    !allOrders.isEmpty() ? (
        <div style={{ marginTop: "60px" }}>
            {allOrders.map(v => (
                <MyOrderItem
                    item={v}
                    type="deliver"
                    key={v.get("_id")}
                    handleGetOrder={getOrder}
                />
            ))}
        </div>
    ) : null
)

List.propTypes = {
    allOrders: ImmutablePropTypes.list.isRequired,
    getOrder: PropTypes.func.isRequired,
};

export default List;
