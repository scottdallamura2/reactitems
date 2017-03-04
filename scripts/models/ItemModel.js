define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InputModel {
        constructor(initialValue) {
            this._initialValue = initialValue;
            this._currentValue = initialValue;
        }
        get value() {
            return this._currentValue;
        }
        setValue(newValue) {
            this._currentValue = newValue;
        }
        isDirty() {
            return this._initialValue !== this._currentValue;
        }
        reset() {
            this._currentValue = this._initialValue;
        }
        save() {
            this._initialValue = this._currentValue;
        }
    }
    exports.InputModel = InputModel;
    class FieldModel extends InputModel {
        constructor(fieldDefinition, initialValue) {
            super(initialValue);
            this.fieldDefinition = fieldDefinition;
        }
    }
    exports.FieldModel = FieldModel;
    class ItemModel {
        constructor(item) {
            this.fields = {};
            this.item = item;
            this._name = new InputModel(item.name || "");
            this._description = new InputModel(item.description || "");
            this._enabled = new InputModel((!!item.enabled).toString());
            item.fieldDefinitions.forEach((fieldDefinition) => {
                this.fields[fieldDefinition.name] = new FieldModel(fieldDefinition, item.fieldValues[fieldDefinition.name]);
            });
        }
        get name() {
            return this._name;
        }
        get description() {
            return this._description;
        }
        get enabled() {
            return this._enabled;
        }
        reset() {
            for (let i in this.fields) {
                this.fields[i].reset();
            }
            this.name.reset();
            this.description.reset();
            this.enabled.reset();
        }
        save() {
            for (let i in this.fields) {
                this.fields[i].save();
            }
            this.name.save();
            this.description.save();
            this.enabled.save();
        }
    }
    exports.ItemModel = ItemModel;
});
