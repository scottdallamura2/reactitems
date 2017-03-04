define(["require", "exports", "react", "./FieldInput"], function (require, exports, React, FieldInput_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StringField extends React.Component {
        constructor() {
            super(...arguments);
            this._onChange = (changeEvent) => {
                if (this.props.onChange) {
                    this.props.onChange(changeEvent.target.value.toString());
                }
            };
        }
        render() {
            return React.createElement(FieldInput_1.FieldInput, { name: this.props.name, isDirty: this.props.isDirty },
                React.createElement("input", { type: "text", id: this.props.name, name: this.props.name, value: this.props.value, onChange: this._onChange }));
        }
    }
    exports.StringField = StringField;
});
