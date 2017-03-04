define(["require", "exports", "react", "../contracts/Field", "../actions/ItemActions", "./BooleanField", "./StringField"], function (require, exports, React, Field_1, ItemActions_1, BooleanField_1, StringField_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemDetail extends React.Component {
        constructor() {
            super(...arguments);
            this._onFieldValueChanged = (definition, newValue) => {
                ItemActions_1.ItemActions.fieldValueChanged.invoke({
                    itemId: this.props.item.item.id,
                    fieldName: definition.name,
                    newValue: newValue
                });
            };
            this._onPropertyChanged = (propertyName, newValue) => {
                ItemActions_1.ItemActions.propertyValueChanged.invoke({
                    itemId: this.props.item.item.id,
                    propertyName: propertyName,
                    newValue: newValue
                });
            };
        }
        render() {
            return this.props.item && React.createElement("div", { className: "item-detail" },
                React.createElement(StringField_1.StringField, { name: "Name", value: this.props.item.name.value, isDirty: this.props.item.name.isDirty(), onChange: (newValue) => this._onPropertyChanged("name", newValue) }),
                React.createElement(StringField_1.StringField, { name: "Description", value: this.props.item.description.value, isDirty: this.props.item.description.isDirty(), onChange: (newValue) => this._onPropertyChanged("description", newValue) }),
                React.createElement(BooleanField_1.BooleanField, { name: "Enabled", value: this.props.item.enabled.value, isDirty: this.props.item.enabled.isDirty(), onChange: (newValue) => this._onPropertyChanged("enabled", newValue) }),
                this.props.item.item.fieldDefinitions.map((fieldDefinition) => {
                    let key = this.props.item.item.id + "." + fieldDefinition.name;
                    let field = this.props.item.fields[fieldDefinition.name];
                    switch (fieldDefinition.type) {
                        case Field_1.FieldTypes.String: {
                            return React.createElement(StringField_1.StringField, { key: key, name: fieldDefinition.name, value: field.value, isDirty: field.isDirty(), onChange: (newValue) => this._onFieldValueChanged(fieldDefinition, newValue) });
                        }
                        case Field_1.FieldTypes.Boolean: {
                            return React.createElement(BooleanField_1.BooleanField, { key: key, name: fieldDefinition.name, value: field.value, isDirty: field.isDirty(), onChange: (newValue) => this._onFieldValueChanged(fieldDefinition, newValue) });
                        }
                    }
                }));
        }
    }
    exports.ItemDetail = ItemDetail;
});
