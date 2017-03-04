define(["require", "exports", "react", "../contracts/Field", "../actions/ItemActions", "../stores/ItemStore", "./ItemsOverview", "./ItemDetail"], function (require, exports, React, Field_1, ItemActions_1, ItemStore_1, ItemsOverview_1, ItemDetail_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // scenario setup
    let item1 = {
        id: 1,
        name: "my first item",
        enabled: true,
        description: "",
        fieldDefinitions: [
            { name: "textField", type: Field_1.FieldTypes.String },
            { name: "booleanField", type: Field_1.FieldTypes.Boolean },
        ],
        fieldValues: {}
    };
    item1.fieldValues["textField"] = "text value";
    item1.fieldValues["booleanField"] = "true";
    let item2 = {
        id: 2,
        name: "my second item",
        enabled: false,
        description: "initially disabled",
        fieldDefinitions: [
            { name: "textField", type: Field_1.FieldTypes.String },
            { name: "booleanField", type: Field_1.FieldTypes.Boolean },
            { name: "anotherField", type: Field_1.FieldTypes.String },
        ],
        fieldValues: {}
    };
    item2.fieldValues["textField"] = "";
    item2.fieldValues["booleanField"] = "false";
    item2.fieldValues["anotherField"] = "another value";
    ItemActions_1.ItemActions.itemAdded.invoke(item1);
    ItemActions_1.ItemActions.itemAdded.invoke(item2);
    class MainControllerView extends React.Component {
        constructor() {
            super();
            this._itemStore = ItemStore_1.getInstance();
            this._onReset = () => {
                ItemActions_1.ItemActions.itemsReset.invoke({});
            };
            this._onSave = () => {
                ItemActions_1.ItemActions.itemsSaved.invoke({});
            };
            this._onItemStoreChanged = () => {
                this.setState(this._getState());
            };
            this._onItemSelected = (item) => {
                this.setState(this._getState(item));
            };
            this.state = this._getState();
        }
        render() {
            return React.createElement("div", { className: "main" },
                React.createElement("div", { className: "two-panel-container" },
                    React.createElement("div", { className: "left-panel" },
                        React.createElement(ItemsOverview_1.ItemsOverview, { items: this.state.items, selectedItem: this.state.selectedItem, onItemSelected: this._onItemSelected })),
                    React.createElement("div", { className: "right-panel" },
                        React.createElement(ItemDetail_1.ItemDetail, { item: this.state.selectedItem }))),
                React.createElement("div", { className: "footer" },
                    React.createElement("button", { onClick: this._onReset }, "Reset"),
                    React.createElement("button", { onClick: this._onSave }, "Save")));
        }
        componentDidMount() {
            this._itemStore.addListener(this._onItemStoreChanged);
        }
        componentWillUnmount() {
            this._itemStore.removeListener(this._onItemStoreChanged);
        }
        _getState(selectedItem) {
            let items = this._itemStore.getItems();
            if (!selectedItem && this.state) {
                selectedItem = this.state.selectedItem;
            }
            selectedItem = selectedItem || items[0];
            return {
                items: items,
                selectedItem: selectedItem
            };
        }
    }
    exports.MainControllerView = MainControllerView;
});
