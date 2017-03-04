define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TwoPanelView extends React.Component {
        render() {
            return React.createElement("div", { className: "two-panel-container" },
                React.createElement("div", { className: "left-panel" }, this.props.left),
                React.createElement("div", { className: "right-panel" }, this.props.right));
        }
    }
    exports.TwoPanelView = TwoPanelView;
});
