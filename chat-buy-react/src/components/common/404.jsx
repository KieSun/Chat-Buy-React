import React from "react";
import { withRouter } from "react-router-dom";

@withRouter
class NotFound extends React.Component {
  componentDidMount() {
    // this.timer = setTimeout(() => {
    //   this.props.history.push('/')
    // }, 2000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  render() {
    return (
      <div className='center'>
        抱歉，找不到该页面!
      </div>
    )
  }
}

export default NotFound;
