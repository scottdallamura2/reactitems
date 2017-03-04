define(["require", "exports", "react", "./FieldInput"], function (require, exports, React, FieldInput_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BooleanField extends React.Component {
        constructor() {
            super(...arguments);
            this._onChange = (changeEvent) => {
                if (this.props.onChange) {
                    this.props.onChange(changeEvent.target.checked.toString());
                }
            };
        }
        render() {
            let checked = this.props.value == "true";
            return React.createElement(FieldInput_1.FieldInput, { name: this.props.name, isDirty: this.props.isDirty },
                React.createElement("input", { type: "checkbox", id: this.props.name, name: this.props.name, checked: checked, onChange: this._onChange }));
        }
    }
    exports.BooleanField = BooleanField;
});
