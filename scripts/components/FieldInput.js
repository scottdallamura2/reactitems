define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FieldInput extends React.Component {
        render() {
            let className = "field-input-container";
            if (this.props.isDirty) {
                className += " dirty";
            }
            return React.createElement("div", { className: className },
                React.createElement("div", { className: "field-label" }, this.props.name),
                React.createElement("div", { className: "field-input" }, this.props.children));
        }
    }
    exports.FieldInput = FieldInput;
});
