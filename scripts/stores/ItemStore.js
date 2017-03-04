define(["require", "exports", "../actions/ItemActions", "../models/ItemModel", "./store"], function (require, exports, ItemActions_1, ItemModel_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemStore extends store_1.Store {
        constructor() {
            super();
            this._items2 = {};
            this._items = {};
            this._onItemAdded = (item) => {
                this._items[item.id.toString()] = new ItemModel_1.ItemModel(item);
                this.emitChanged();
            };
            this._onFieldValueChanged = (payload) => {
                let item = this._items[payload.itemId];
                if (item) {
                    item.fields[payload.fieldName].setValue(payload.newValue);
                    this.emitChanged();
                }
            };
            this._onPropertyValueChanged = (payload) => {
                let item = this._items[payload.itemId];
                if (item) {
                    switch (payload.propertyName) {
                        case "name":
                            item.name.setValue(payload.newValue);
                            break;
                        case "description":
                            item.description.setValue(payload.newValue);
                            break;
                        case "enabled":
                            item.enabled.setValue(payload.newValue);
                            break;
                    }
                    this.emitChanged();
                }
            };
            this._onItemsSaved = () => {
                // simulate save
                for (let i in this._items) {
                    this._items[i].save();
                }
                this.emitChanged();
            };
            this._onItemsReset = () => {
                for (let i in this._items) {
                    this._items[i].reset();
                }
                this.emitChanged();
            };
            ItemActions_1.ItemActions.itemAdded.addListener(this._onItemAdded);
            ItemActions_1.ItemActions.fieldValueChanged.addListener(this._onFieldValueChanged);
            ItemActions_1.ItemActions.propertyValueChanged.addListener(this._onPropertyValueChanged);
            ItemActions_1.ItemActions.itemsSaved.addListener(this._onItemsSaved);
            ItemActions_1.ItemActions.itemsReset.addListener(this._onItemsReset);
        }
        getItems() {
            let items = [];
            for (let i in this._items) {
                items.push(this._items[i]);
            }
            return items;
        }
        getItem(id) {
            return this._items[id.toString()];
        }
    }
    exports.ItemStore = ItemStore;
    const _instance = new ItemStore();
    function getInstance() {
        return _instance;
    }
    exports.getInstance = getInstance;
});
