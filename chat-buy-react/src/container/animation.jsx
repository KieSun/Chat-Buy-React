import React from "react";
import QueueAnim from "rc-queue-anim";

function animationContainer(Component) {
  return class animation extends React.Component {
    render() {
      return (
        <QueueAnim delay={250} type={['right', 'left']} >
          <Component key={Component.name} {...this.props} />
        </QueueAnim>
      );
    }
  };
}

export default animationContainer;
