import { NavBar, Icon } from "antd-mobile";
import React from "react";
import PropTypes from "prop-types";

const BackNavBar = ({ title, backClick }) => (
  <NavBar
    className="nav"
    icon={<Icon type="left" />}
    onLeftClick={() => backClick()}
  >
    {title}
  </NavBar>
);

BackNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  backClick: PropTypes.func.isRequired
};

export default BackNavBar;
