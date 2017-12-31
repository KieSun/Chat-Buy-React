import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import App from "./router/router";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";
import "./common/axiosMiddleware";
import "fastclick";
import "./styles/index.scss";

const store = configureStore();

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
}

render(App);

registerServiceWorker();

if (module.hot) {
  module.hot.accept("./router/router", () => {
    const NextApp = require("./router/router").default;
    render(NextApp);
  });
}
