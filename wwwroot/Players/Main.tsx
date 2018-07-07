import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Layouts from "./Layout";

let Layout = Layouts.Application;

const renderApp = () =>
    ReactDOM.render(<Layout />, document.getElementById("content"));

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept("./Layout", () => {
        Layout = require<typeof Layouts>("./Layout").Application;
        renderApp();
    });
}
