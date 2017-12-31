import { NavBar, Icon } from "antd-mobile";
import React from "react";
import PropTypes from "prop-types";

const BackNavBar = ({ title, backClick, hasIcon = true }) => (
  <NavBar
    className="nav"
    icon={hasIcon && <Icon type="left" />}
    onLeftClick={() => backClick()}
  >
    {title}
  </NavBar>
);

BackNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  backClick: PropTypes.func,
  hasIcon: PropTypes.bool
};

export default BackNavBar;
