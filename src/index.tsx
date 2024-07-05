import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
    <App />
    </DndProvider>
  </Provider>,
  document.getElementById("root")
);