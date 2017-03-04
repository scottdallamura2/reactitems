define(["require", "exports", "react", "react-dom", "./components/MainControllerView"], function (require, exports, React, ReactDom, MainControllerView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let main = document.getElementById("main");
    ReactDom.render(React.createElement(MainControllerView_1.MainControllerView, null), main);
});
