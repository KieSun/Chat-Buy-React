import React from "react";
import Nav from "../navBar/backNavBar";
import { Button } from "antd-mobile";
import { withRouter } from "react-router-dom";

@withRouter
class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Nav title="找不到该页面" hasIcon={false} />
        <div className="center">
          抱歉，找不到该页面!
          <Button
            type="primary"
            size="small"
            onClick={() => this.props.history.push("/")}
          >
            回到首页
          </Button>
        </div>
      </div>
    );
  }
}

export default NotFound;
